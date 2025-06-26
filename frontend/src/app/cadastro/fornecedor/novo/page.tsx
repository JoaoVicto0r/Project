"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FornecedorForm } from "@/components/fornecedor/fornecedor-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface FornecedorFormData {
  name: string
  email: string
  phone: string
  address: string
  cnpj: string
  isActive: boolean
}

export default function NovoFornecedorPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: FornecedorFormData) => {
    setIsLoading(true)

    try {
      // Simular chamada para API
      console.log("Dados do fornecedor:", data)

      // Aqui você faria a chamada real para sua API
      // const response = await fetch('/api/fornecedores', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // })

      // Simular delay da API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mostrar mensagem de sucesso (você pode usar um toast aqui)
      alert("Fornecedor cadastrado com sucesso!")

      // Redirecionar para a lista de fornecedores
      router.push("/cadastro/fornecedor")
    } catch (error) {
      console.error("Erro ao cadastrar fornecedor:", error)
      alert("Erro ao cadastrar fornecedor. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/cadastro/fornecedor")
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Link href="/cadastro/fornecedor" className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Fornecedores</span>
        </Link>
      </div>

      {/* Form */}
      <FornecedorForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isLoading} mode="create" />

      {/* Informações adicionais */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 max-w-2xl mx-auto">
        <h3 className="font-medium text-blue-900 mb-2">💡 Dicas para cadastro</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• O nome do fornecedor é obrigatório</li>
          <li>• Email e telefone facilitam o contato</li>
          <li>• CNPJ deve estar no formato: 12.345.678/0001-90</li>
          <li>• Fornecedores inativos não aparecem nas seleções</li>
        </ul>
      </div>
    </div>
  )
}
