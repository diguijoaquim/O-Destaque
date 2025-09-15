"use client"

import React, { useEffect, useState } from "react"
import FlipbookViewer from "@/app/_components/ui/flipbook-viewer/flipbook-viewer"

const API_URL = "https://diqui.pythonanywhere.com/api/creditos"

const Page = () => {
  const [codigo, setCodigo] = useState("")
  const [autorizado, setAutorizado] = useState(false)
  const [creditos, setCreditos] = useState([])
  const [loading, setLoading] = useState(true)
  const [mensagem, setMensagem] = useState(null) // { tipo: "erro" | "sucesso", texto: "mensagem" }

  useEffect(() => {
    const fetchCreditos = async () => {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error("Erro ao buscar créditos")

        const data = await res.json()
        const ativos = data.filter((c) => c.ativo === true)
        setCreditos(ativos)

        const savedCode = localStorage.getItem("creditoCode")
        if (savedCode && ativos.some((c) => c.codigo === savedCode)) {
          setAutorizado(true)
        }
      } catch (err) {
        console.error("❌ Erro ao buscar créditos:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCreditos()
  }, [])

  const validarCodigo = () => {
    const code = codigo.trim()
    const valido = creditos.some((c) => c.codigo === code)

    if (valido) {
      localStorage.setItem("creditoCode", code)
      setAutorizado(true)
      setMensagem({ tipo: "sucesso", texto: "✅ Código autorizado!" })
    } else {
      setMensagem({ tipo: "erro", texto: "❌ Código inválido ou inativo!" })
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        Carregando...
      </div>
    )
  }

  if (!autorizado) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="p-6 rounded-2xl shadow-lg bg-[#0d0d0d] w-80 text-center border border-gray-800">
          <h2 className="text-xl font-bold mb-4 text-white">Digite seu código</h2>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Insira seu código"
            className="border-2 border-purple-600 rounded-lg p-2 w-full mb-4 text-center bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={validarCodigo}
            className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg px-4 py-2 w-full font-semibold hover:opacity-90 transition"
          >
            Entrar
          </button>

          {mensagem && (
            <div
              className={`mt-4 p-2 rounded ${
                mensagem.tipo === "sucesso"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {mensagem.texto}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 bg-black min-h-screen">
      <h1 className="text-2xl font-bold text-green-500 mb-4 text-center">
        ✅ Acesso liberado
      </h1>
      <FlipbookViewer pdfUrl="/DESTAQUE-1.pdf" />
    </div>
  )
}

export default Page
