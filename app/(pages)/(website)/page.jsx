"use client"

import React, { useEffect, useState } from "react"

const API_URL = "https://diqui.pythonanywhere.com/api/creditos"

const Page = () => {
  const [codigo, setCodigo] = useState("")
  const [autorizado, setAutorizado] = useState(false)
  const [loading, setLoading] = useState(true)
  const [creditos, setCreditos] = useState([])

  useEffect(() => {
    const fetchCreditos = async () => {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) {
          throw new Error(`Erro HTTP! status: ${res.status}`)
        }
        const data = await res.json()

        console.log("✅ Dados recebidos da API:", data) // print do JSON

        const ativos = data.filter((c) => c.ativo === true)
        setCreditos(ativos)

        const saved = localStorage.getItem("codigo")
        if (saved && ativos.some(c => c.codigo === saved)) {
          setAutorizado(true)
        }
      } catch (error) {
        console.error("❌ Erro ao buscar créditos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCreditos()
  }, [])

  const verificarCodigo = () => {
    const code = codigo.trim()
    const existe = creditos.some(c => c.codigo === code)

    if (existe) {
      localStorage.setItem("codigo", code)
      setAutorizado(true)
      alert("✅ Código autorizado!")
    } else {
      alert("❌ Código inválido ou inativo!")
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Carregando dados...</p>
      </div>
    )
  }

  if (!autorizado) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
          <h1 className="text-xl font-semibold mb-4">Acesso</h1>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Digite o código"
            className="w-full p-2 border rounded mb-4"
            autoFocus
          />
          <button
            onClick={verificarCodigo}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Verificar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold text-green-700 mb-4">✅ Acesso liberado</h1>
      <p>Agora você pode ver o conteúdo.</p>
    </div>
  )
}

export default Page
