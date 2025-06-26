"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { use } from "react"
import { FornecedorForm } from "@/components/fornecedor/fornecedor-form"
import { ArrowLeft, Loader } from "lucide-react"
import Link from "next/link"

interface FornecedorFormData {
  name: string
  email: string
  phone: string
  address: string
  cnpj: string
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
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    const loadFornecedor = async () => {
      try {
        // Simular carregamento dos dados do fornecedor
        // Aqui você faria a chamada real para sua API
        // const response = await fetch(`/api/fornecedores/${id}`)
        // const data = await response.json()

        // Dados simulados
        const mockFornecedor: Fornecedor = {
          id: id,
          name: "Moinho São Paulo",
          email: "contato@moinhosp.com.br",
          phone: "(11) 3456-7890",
          address: "Rua das Indústrias, 123 - São Paulo, SP",
          cnpj: "12.345.678/0001-90",
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
        setIsLoadingData(false)
      }
    }

    loadFornecedor()
  }, [id, router])

  const handleSubmit = async (data: FornecedorFormData) => {
    setIsLoading(true)

    try {
      console.log("Atualizando fornecedor:", { id, ...data })

      // Aqui você faria a chamada real para sua API
      // const response = await fetch(`/api/fornecedores/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // })

      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simular delay

      alert("Fornecedor atualizado com sucesso!")
      router.push("/cadastro/fornecedor")
    } catch (error) {
      console.error("Erro ao atualizar fornecedor:", error)
      alert("Erro ao atualizar fornecedor. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/cadastro/fornecedor")
  }

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Carregando dados do fornecedor...</p>
        </div>
      </div>
    )
  }

  if (!fornecedor) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Fornecedor não encontrado</p>
        <Link href="/cadastro/fornecedor">
          <button className="btn-primary">Voltar para Fornecedores</button>
        </Link>
      </div>
    )
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
      <FornecedorForm
        initialData={fornecedor}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
        mode="edit"
      />

      {/* Informações do registro */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 max-w-2xl mx-auto">
        <h3 className="font-medium text-gray-900 mb-2">📋 Informações do registro</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>ID: {fornecedor.id}</p>
          <p>Cadastrado em: {new Date(fornecedor.createdAt).toLocaleDateString("pt-BR")}</p>
          <p>Última atualização: {new Date(fornecedor.updatedAt).toLocaleDateString("pt-BR")}</p>
        </div>
      </div>
    </div>
  )
}
