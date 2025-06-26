"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { use } from "react"
import { CategoriaForm } from "@/components/categoria/categoria-form"
import { ArrowLeft, Loader } from "lucide-react"
import Link from "next/link"

interface CategoriaFormData {
  name: string
  description: string
  color: string
}

interface Categoria extends CategoriaFormData {
  id: string
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
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    const loadCategoria = async () => {
      try {
        setLoadingData(true)

        // Simular carregamento dos dados da categoria
        // Aqui você faria a chamada real para sua API
        // const data = await api.getCategory(id)

        // Dados simulados
        const mockCategoria: Categoria = {
          id: id,
          name: "Bolos",
          description: "Bolos tradicionais, bolos de festa, cupcakes e similares",
          color: "bg-blue-500",
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
        setLoadingData(false)
      }
    }

    loadCategoria()
  }, [id, router])

  const handleSubmit = async (data: CategoriaFormData) => {
    setLoading(true)

    try {
      console.log("Atualizando categoria:", { id, ...data })

      // Aqui você faria a chamada real para sua API
      // await api.updateCategory(id, data)

      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simular delay

      alert("Categoria atualizada com sucesso!")
      router.push("/cadastro/categoria")
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error)
      alert("Erro ao atualizar categoria. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/cadastro/categoria")
  }

  if (loadingData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-neutral-600 font-extrabold tracking-wider">Carregando dados da categoria...</p>
        </div>
      </div>
    )
  }

  if (!categoria) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600 font-extrabold tracking-wider mb-4">Categoria não encontrada</p>
        <Link href="/cadastro/categoria">
          <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold tracking-wider px-6 py-3 rounded-lg transition-all">
            Voltar para Categorias
          </button>
        </Link>
      </div>
    )
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
      <CategoriaForm
        initialData={categoria}
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
            <span className="font-extrabold">ID:</span> {categoria.id}
          </p>
          <p>
            <span className="font-extrabold">Criada em:</span>{" "}
            {new Date(categoria.createdAt).toLocaleDateString("pt-BR")}
          </p>
          <p>
            <span className="font-extrabold">Última atualização:</span>{" "}
            {new Date(categoria.updatedAt).toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>

      {/* Aviso sobre impacto */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="font-extrabold text-yellow-900 tracking-wider mb-2">⚠️ Atenção</h3>
        <p className="text-sm text-yellow-800 tracking-wider">
          Alterar o nome da categoria pode afetar a organização de receitas e insumos já cadastrados. Certifique-se de
          que o novo nome seja claro e específico.
        </p>
      </div>
    </div>
  )
}
