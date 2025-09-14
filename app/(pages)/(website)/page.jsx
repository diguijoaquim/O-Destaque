"use client"

import React, { useEffect, useState } from "react"
import FlipbookViewer from "@/app/_components/ui/flipbook-viewer/flipbook-viewer"

interface Credito {
  codigo: string
  usuario: string
  ativo: boolean
}

const API_URL = "https://diqui.pythonanywhere.com/api/creditos"

const Page = () => {
  const [codigo, setCodigo] = useState("")
  const [autorizado, setAutorizado] = useState(false)
  const [creditos, setCreditos] = useState<Credito[]>([])

  // Buscar créditos ativos da API
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: Credito[]) => {
        const ativos = data.filter((c) => c.ativo)
        setCreditos(ativos)
        // Verifica se já tem código válido no localStorage
        const savedCode = localStorage.getItem("creditoCode")
        if (savedCode && ativos.some((c) => c.codigo === savedCode)) {
          setAutorizado(true)
        }
      })
      .catch((err) => console.error("Erro ao buscar créditos:", err))
  }, [])

  const validarCodigo = () => {
    if (creditos.some((c) => c.codigo === codigo)) {
      localStorage.setItem("creditoCode", codigo)
      setAutorizado(true)
    } else {
      alert("Código inválido ou inativo!")
    }
  }

  if (!autorizado) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="p-6 rounded-2xl shadow-lg bg-white w-80 text-center">
          <h2 className="text-xl font-bold mb-4">Digite seu código</h2>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Insira seu código"
            className="border rounded-lg p-2 w-full mb-4 text-center"
          />
          <button
            onClick={validarCodigo}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 w-full hover:bg-blue-700 transition"
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
