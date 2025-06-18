"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import CategoriaForm from "@/components/categoria/categoria-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface CategoriaFormData {
  name: string
  description: string
}

export default function NovaCategoriaPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: CategoriaFormData) => {
    setIsLoading(true)

    try {
      // Simular chamada para API
      console.log("Dados da categoria:", data)

      // Aqui você faria a chamada real para sua API
      // const response = await fetch('/api/categorias', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // })

      // Simular delay da API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mostrar mensagem de sucesso
      alert("Categoria cadastrada com sucesso!")

      // Redirecionar para a lista de categorias
      router.push("/cadastro/categoria")
    } catch (error) {
      console.error("Erro ao cadastrar categoria:", error)
      alert("Erro ao cadastrar categoria. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/cadastro/categoria")
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Link
          href="/cadastro/categoria"
          className="flex items-center space-x-1 hover:text-purple-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Categorias</span>
        </Link>
      </div>

      {/* Form */}
      <CategoriaForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isLoading} mode="create" />

      {/* Informações adicionais */}
      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 max-w-2xl mx-auto">
        <h3 className="font-medium text-purple-900 mb-2">📋 Sobre as Categorias</h3>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• Categorias ajudam a organizar receitas e insumos</li>
          <li>• O nome da categoria deve ser único no sistema</li>
          <li>• A descrição é opcional mas recomendada</li>
          <li>• Você pode escolher uma cor para identificar visualmente</li>
          <li>• Use as sugestões para categorias mais comuns</li>
        </ul>
      </div>
    </div>
  )
}
