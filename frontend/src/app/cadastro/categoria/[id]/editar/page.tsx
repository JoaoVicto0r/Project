"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { use } from "react"
import { CategoriaForm } from "@/components/categoria/categoria-form";
import { ArrowLeft, Loader } from "lucide-react"
import Link from "next/link"

interface CategoriaFormData {
  name: string
  description: string
}

interface Categoria extends CategoriaFormData {
  id: number
  createdAt: string
  updatedAt: string
}

export default function EditarCategoriaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [categoria, setCategoria] = useState<Categoria | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    const loadCategoria = async () => {
      try {
        // Simular carregamento dos dados da categoria
        // Aqui você faria a chamada real para sua API
        // const response = await fetch(`/api/categorias/${id}`)
        // const data = await response.json()

        // Dados simulados
        const mockCategoria: Categoria = {
          id: Number.parseInt(id),
          name: "Bolos",
          description: "Bolos tradicionais, bolos de festa, cupcakes e similares",
          createdAt: "2024-01-15",
          updatedAt: "2024-01-15",
        }

        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simular delay
        setCategoria(mockCategoria)
      } catch (error) {
        console.error("Erro ao carregar categoria:", error)
        alert("Erro ao carregar dados da categoria")
        router.push("/cadastro/categoria")
      } finally {
        setIsLoadingData(false)
      }
    }

    loadCategoria()
  }, [id, router])

  const handleSubmit = async (data: CategoriaFormData) => {
    setIsLoading(true)

    try {
      console.log("Atualizando categoria:", { id, ...data })

      // Aqui você faria a chamada real para sua API
      // const response = await fetch(`/api/categorias/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // })

      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simular delay

      alert("Categoria atualizada com sucesso!")
      router.push("/cadastro/categoria")
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error)
      alert("Erro ao atualizar categoria. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/cadastro/categoria")
  }

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-gray-600">Carregando dados da categoria...</p>
        </div>
      </div>
    )
  }

  if (!categoria) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Categoria não encontrada</p>
        <Link href="/cadastro/categoria">
          <button className="btn-primary">Voltar para Categorias</button>
        </Link>
      </div>
    )
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
      <CategoriaForm
        initialData={categoria}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
        mode="edit"
      />

      {/* Informações do registro */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 max-w-2xl mx-auto">
        <h3 className="font-medium text-gray-900 mb-2">📋 Informações do registro</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>ID: {categoria.id}</p>
          <p>Criada em: {new Date(categoria.createdAt).toLocaleDateString("pt-BR")}</p>
          <p>Última atualização: {new Date(categoria.updatedAt).toLocaleDateString("pt-BR")}</p>
        </div>
      </div>

      {/* Aviso sobre impacto */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 max-w-2xl mx-auto">
        <h3 className="font-medium text-yellow-900 mb-2">⚠️ Atenção</h3>
        <p className="text-sm text-yellow-800">
          Alterar o nome da categoria pode afetar a organização de receitas e insumos já cadastrados. Certifique-se de
          que o novo nome seja claro e específico.
        </p>
      </div>
    </div>
  )
}
