"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { use } from "react"
import FornecedorForm from "@/components/fornecedor/fornecedor-form"
import { ArrowLeft, Loader } from "lucide-react"
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

interface Fornecedor extends FornecedorFormData {
  id: string
  createdAt: string
  updatedAt: string
}

export default function EditarFornecedorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [fornecedor, setFornecedor] = useState<Fornecedor | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    const loadFornecedor = async () => {
      try {
        setLoadingData(true)

        // Simular carregamento dos dados do fornecedor
        // Aqui você faria a chamada real para sua API
        // const data = await api.getSupplier(id)

        // Dados simulados
        const mockFornecedor: Fornecedor = {
          id: id,
          name: "Moinho São Paulo",
          email: "contato@moinhosp.com.br",
          phone: "(11) 3456-7890",
          address: "Rua das Indústrias, 123 - São Paulo, SP",
          documentType: "cnpj",
          document: "12.345.678/0001-90",
          paymentMethod: "pix",
          pixKey: "12.345.678/0001-90",
          pixKeyType: "cnpj",
          isActive: true,
          createdAt: "2024-01-15",
          updatedAt: "2024-01-15",
        }

        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simular delay
        setFornecedor(mockFornecedor)
      } catch (error) {
        console.error("Erro ao carregar fornecedor:", error)
        alert("Erro ao carregar dados do fornecedor")
        router.push("/cadastro/fornecedor")
      } finally {
        setLoadingData(false)
      }
    }

    loadFornecedor()
  }, [id, router])

  const handleSubmit = async (data: FornecedorFormData) => {
    setLoading(true)

    try {
      console.log("Atualizando fornecedor:", { id, ...data })

      // Aqui você faria a chamada real para sua API
      // await api.updateSupplier(id, data)

      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simular delay

      alert("Fornecedor atualizado com sucesso!")
      router.push("/cadastro/fornecedor")
    } catch (error) {
      console.error("Erro ao atualizar fornecedor:", error)
      alert("Erro ao atualizar fornecedor. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/cadastro/fornecedor")
  }

  if (loadingData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-neutral-600 font-extrabold tracking-wider">Carregando dados do fornecedor...</p>
        </div>
      </div>
    )
  }

  if (!fornecedor) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600 font-extrabold tracking-wider mb-4">Fornecedor não encontrado</p>
        <Link href="/cadastro/fornecedor">
          <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold tracking-wider px-6 py-3 rounded-lg transition-all">
            Voltar para Fornecedores
          </button>
        </Link>
      </div>
    )
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
      <FornecedorForm
        initialData={fornecedor}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        mode="edit"
      />

      {/* Informações do registro */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
        <h3 className="font-extrabold text-neutral-800 tracking-wider mb-2">📋 Informações do registro</h3>
        <div className="text-sm text-neutral-600 space-y-1 tracking-wider">
          <p>
            <span className="font-extrabold">ID:</span> {fornecedor.id}
          </p>
          <p>
            <span className="font-extrabold">Cadastrado em:</span>{" "}
            {new Date(fornecedor.createdAt).toLocaleDateString("pt-BR")}
          </p>
          <p>
            <span className="font-extrabold">Última atualização:</span>{" "}
            {new Date(fornecedor.updatedAt).toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>

      {/* Aviso sobre impacto */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="font-extrabold text-yellow-900 tracking-wider mb-2">⚠️ Atenção</h3>
        <p className="text-sm text-yellow-800 tracking-wider">
          Alterar informações do fornecedor pode afetar pedidos e transações já realizadas. Certifique-se de que os
          dados estejam corretos antes de salvar.
        </p>
      </div>
    </div>
  )
}
