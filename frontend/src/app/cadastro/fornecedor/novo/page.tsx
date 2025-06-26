"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import FornecedorForm from "@/components/fornecedor/fornecedor-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface FornecedorFormData {
  name: string
  email: string
  phone: string
  address: string
  documentType: "cpf" | "cnpj" | "none"
  document: string
  paymentMethod: "dinheiro" | "cartao" | "pix" | "transferencia" | "boleto"
  pixKey?: string
  pixKeyType?: "cpf" | "cnpj" | "email" | "telefone" | "aleatoria"
  isActive: boolean
}

export default function NovoFornecedorPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: FornecedorFormData) => {
    setLoading(true)

    try {
      console.log("Dados do fornecedor:", data)

      // Aqui você faria a chamada real para sua API
      // await api.createSupplier(data)

      // Simular delay da API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      alert("Fornecedor cadastrado com sucesso!")
      router.push("/cadastro/fornecedor")
    } catch (error) {
      console.error("Erro ao cadastrar fornecedor:", error)
      alert("Erro ao cadastrar fornecedor. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/cadastro/fornecedor")
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-neutral-600">
        <Link href="/cadastro/fornecedor" className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-extrabold tracking-wider">Voltar para Fornecedores</span>
        </Link>
      </div>

      {/* Form */}
      <FornecedorForm onSubmit={handleSubmit} onCancel={handleCancel} loading={loading} mode="create" />

      {/* Informações adicionais */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-extrabold text-blue-900 tracking-wider mb-3">💡 Dicas para cadastro</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-extrabold tracking-wider mb-2">Campos Obrigatórios:</h4>
            <ul className="space-y-1 tracking-wider">
              <li>• Nome do fornecedor é obrigatório</li>
              <li>• Email e telefone facilitam o contato</li>
              <li>• Documento é opcional mas recomendado</li>
              <li>• Escolha a forma de pagamento preferida</li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold tracking-wider mb-2">Configuração PIX:</h4>
            <ul className="space-y-1 tracking-wider">
              <li>• Configure PIX para pagamentos rápidos</li>
              <li>• Escolha o tipo correto da chave</li>
              <li>• Valide o formato da chave PIX</li>
              <li>• Fornecedores inativos não aparecem nas seleções</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
