"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CategoriaForm } from "@/components/categoria/categoria-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface CategoriaFormData {
  name: string
  description: string
  color: string
}

export default function NovaCategoriaPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: CategoriaFormData) => {
    setLoading(true)

    try {
      console.log("Dados da categoria:", data)

      // Aqui você faria a chamada real para sua API
      // await api.createCategory(data)

      // Simular delay da API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      alert("Categoria cadastrada com sucesso!")
      router.push("/cadastro/categoria")
    } catch (error) {
      console.error("Erro ao cadastrar categoria:", error)
      alert("Erro ao cadastrar categoria. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/cadastro/categoria")
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-neutral-600">
        <Link
          href="/cadastro/categoria"
          className="flex items-center space-x-1 hover:text-purple-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-extrabold tracking-wider">Voltar para Categorias</span>
        </Link>
      </div>

      {/* Form */}
      <CategoriaForm onSubmit={handleSubmit} onCancel={handleCancel} loading={loading} mode="create" />

      {/* Informações adicionais */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
        <h3 className="font-extrabold text-purple-900 tracking-wider mb-3">📋 Sobre as Categorias</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-800">
          <div>
            <h4 className="font-extrabold tracking-wider mb-2">Funcionalidades:</h4>
            <ul className="space-y-1 tracking-wider">
              <li>• Organizam receitas e insumos</li>
              <li>• Facilitam a busca e filtros</li>
              <li>• Melhoram a visualização</li>
              <li>• Permitem relatórios por categoria</li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold tracking-wider mb-2">Requisitos:</h4>
            <ul className="space-y-1 tracking-wider">
              <li>• Nome único no sistema</li>
              <li>• Descrição é opcional mas recomendada</li>
              <li>• Escolha uma cor para identificação</li>
              <li>• Use as sugestões para categorias comuns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
