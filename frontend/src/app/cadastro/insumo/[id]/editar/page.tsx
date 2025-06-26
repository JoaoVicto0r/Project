"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { use } from "react"
import { InsumoForm } from "@/components/insumos/insumos-form";
import { ArrowLeft, Loader } from "lucide-react"
import Link from "next/link"

interface InsumoFormData {
  name: string
  description: string
  unit: string
  unitCost: number
  stock: number
  minStock: number
  expirationDate: string
  isActive: boolean
  categoryId: number
  supplierId: string
}

interface Insumo extends InsumoFormData {
  id: number
  createdAt: string
  updatedAt: string
}

export default function EditarInsumoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [insumo, setInsumo] = useState<Insumo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    const loadInsumo = async () => {
      try {
        // Simular carregamento dos dados do insumo
        // Aqui você faria a chamada real para sua API
        // const response = await fetch(`/api/insumos/${id}`)
        // const data = await response.json()

        // Dados simulados
        const mockInsumo: Insumo = {
          id: Number.parseInt(id),
          name: "Farinha de Trigo Especial",
          description: "Farinha de trigo tipo 1, ideal para bolos e pães",
          unit: "kg",
          unitCost: 4.5,
          stock: 25.5,
          minStock: 10,
          expirationDate: "2024-08-15",
          isActive: true,
          categoryId: 1,
          supplierId: "1",
          createdAt: "2024-01-15",
          updatedAt: "2024-01-15",
        }

        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simular delay
        setInsumo(mockInsumo)
      } catch (error) {
        console.error("Erro ao carregar insumo:", error)
        alert("Erro ao carregar dados do insumo")
        router.push("/insumos")
      } finally {
        setIsLoadingData(false)
      }
    }

    loadInsumo()
  }, [id, router])

  const handleSubmit = async (data: InsumoFormData) => {
    setIsLoading(true)

    try {
      console.log("Atualizando insumo:", { id, ...data })

      // Aqui você faria a chamada real para sua API
      // const response = await fetch(`/api/insumos/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // })

      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simular delay

      alert("Insumo atualizado com sucesso!")
      router.push("/insumos")
    } catch (error) {
      console.error("Erro ao atualizar insumo:", error)
      alert("Erro ao atualizar insumo. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/insumos")
  }

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-green-500 mx-auto mb-4" />
          <p className="text-gray-600">Carregando dados do insumo...</p>
        </div>
      </div>
    )
  }

  if (!insumo) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Insumo não encontrado</p>
        <Link href="/insumos">
          <button className="btn-primary">Voltar para Insumos</button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Link href="/insumos" className="flex items-center space-x-1 hover:text-green-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Insumos</span>
        </Link>
      </div>

      {/* Form */}
      <InsumoForm
        initialData={insumo}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
        mode="edit"
      />

      {/* Informações do registro */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 max-w-4xl mx-auto">
        <h3 className="font-medium text-gray-900 mb-2">📋 Informações do registro</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>ID: {insumo.id}</p>
          <p>Cadastrado em: {new Date(insumo.createdAt).toLocaleDateString("pt-BR")}</p>
          <p>Última atualização: {new Date(insumo.updatedAt).toLocaleDateString("pt-BR")}</p>
        </div>
      </div>

      {/* Aviso sobre impacto */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 max-w-4xl mx-auto">
        <h3 className="font-medium text-yellow-900 mb-2">⚠️ Atenção</h3>
        <p className="text-sm text-yellow-800">
          Alterar informações do insumo pode afetar o cálculo de custos das receitas que o utilizam. Certifique-se de
          que os dados estejam corretos antes de salvar.
        </p>
      </div>
    </div>
  )
}
