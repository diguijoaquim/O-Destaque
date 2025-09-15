"use client"

import React, { useEffect, useState } from "react"
import FlipbookViewer from "@/app/_components/ui/flipbook-viewer/flipbook-viewer"

const API_URL = "https://diqui.pythonanywhere.com/api/creditos"

const Page = () => {
  const [codigo, setCodigo] = useState("")
  const [autorizado, setAutorizado] = useState(false)
  const [creditos, setCreditos] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(false)

  useEffect(() => {
    const fetchCreditos = async () => {
      try {
        const res = await fetch(API_URL)
        const data = await res.json()
        const ativos = data.filter((c) => c.ativo)
        setCreditos(ativos)

        const savedCode = localStorage.getItem("creditoCode")
        if (savedCode && ativos.some((c) => String(c.codigo).trim() === savedCode.trim())) {
          setAutorizado(true)
        }
      } catch (err) {
        console.error("Erro ao buscar créditos:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCreditos()
  }, [])

  const validarCodigo = () => {
    const codigoLimpo = codigo.trim()
    const encontrou = creditos.some((c) => String(c.codigo).trim() === codigoLimpo)

    if (encontrou) {
      localStorage.setItem("creditoCode", codigoLimpo)
      setAutorizado(true)
      setErro(false)
    } else {
      setErro(true)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-semibold">
        Carregando...
      </div>
    )
  }

  if (!autorizado) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100">
        <div className="p-8 rounded-2xl shadow-2xl bg-white w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Acesso Restrito</h2>
          <p className="text-gray-600 mb-4">Digite o código de acesso</p>

          <input
            type="text"
            value={codigo}
            onChange={(e) => {
              setCodigo(e.target.value)
              setErro(false)
            }}
            placeholder="Insira seu código"
            className={`border rounded-lg p-3 w-full mb-3 text-center outline-none transition ${
              erro ? "border-red-500" : "border-gray-300 focus:border-blue-500"
            }`}
          />

          {erro && (
            <p className="text-red-500 text-sm mb-3">
              Código inválido ou inativo!
            </p>
          )}

          <button
            onClick={validarCodigo}
            disabled={codigo.trim() === ""}
            className={`rounded-lg px-4 py-2 w-full transition font-semibold ${
              codigo.trim() === ""
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Entrar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="block">
      <FlipbookViewer pdfUrl="/DESTAQUE-1.pdf" />
    </div>
  )
}

export default Page
