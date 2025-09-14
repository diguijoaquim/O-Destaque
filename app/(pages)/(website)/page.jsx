"use client"

import React, { useEffect, useState } from "react"
import FlipbookViewer from "@/app/_components/ui/flipbook-viewer/flipbook-viewer"

// MockDB de créditos válidos
const mockDB = {
  "123456": { user: "João", ativo: true },
  "654321": { user: "Maria", ativo: true },
  "999999": { user: "Pedro", ativo: false },
}

const Page = () => {
  const [codigo, setCodigo] = useState("")
  const [autorizado, setAutorizado] = useState(false)

  useEffect(() => {
    // verifica se já tem código válido no localStorage
    const savedCode = localStorage.getItem("creditoCode")
    if (savedCode && mockDB[savedCode]?.ativo) {
      setAutorizado(true)
    }
  }, [])

  const validarCodigo = () => {
    if (mockDB[codigo] && mockDB[codigo].ativo) {
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
