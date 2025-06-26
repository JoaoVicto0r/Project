"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { use } from "react"
import { ArrowLeft, Loader } from "lucide-react"
import Link from "next/link"
import { InsumoForm } from "@/components/insumos/insumos-form"
import { api, type CreateIngredientData, type Ingredient, type Category, type Supplier } from "@/lib/api"

export default function EditarInsumoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [ingredient, setIngredient] = useState<Ingredient | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    loadData()
  }, [id])

  const loadData = async () => {
    try {
      setLoadingData(true)
      const [ingredientData, categoriesData, suppliersData] = await Promise.all([
        api.getIngredient(id),
        api.getCategories(),
        api.getSuppliers(),
      ])
      setIngredient(ingredientData)
      setCategories(categoriesData)
      setSuppliers(suppliersData)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
      alert("Erro ao carregar dados do insumo")
      router.push("/cadastro/insumo")
    } finally {
      setLoadingData(false)
    }
  }

  const handleSubmit = async (data: CreateIngredientData) => {
    setLoading(true)

    try {
      await api.updateIngredient(id, data)
      alert("Insumo atualizado com sucesso!")
      router.push("/cadastro/insumo")
    } catch (error) {
      console.error("Erro ao atualizar insumo:", error)
      alert("Erro ao atualizar insumo. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/cadastro/insumo")
  }

  if (loadingData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-indigo-500 mx-auto mb-4" />
          <p className="text-neutral-600 font-extrabold tracking-wider">Carregando dados do insumo...</p>
        </div>
      </div>
    )
  }

  if (!ingredient) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600 font-extrabold tracking-wider mb-4">Insumo não encontrado</p>
        <Link href="/cadastro/insumo">
          <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold tracking-wider px-6 py-3 rounded-lg transition-all">
            Voltar para Insumos
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-neutral-600">
        <Link href="/cadastro/insumo" className="flex items-center space-x-1 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-extrabold tracking-wider">Voltar para Insumos</span>
        </Link>
      </div>

      {/* Form */}
      <InsumoForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        initialData={ingredient}
        categories={categories}
        suppliers={suppliers}
      />

      {/* Informações do registro */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
        <h3 className="font-extrabold text-neutral-800 tracking-wider mb-2">📋 Informações do registro</h3>
        <div className="text-sm text-neutral-600 space-y-1 tracking-wider">
          <p>
            <span className="font-extrabold">ID:</span> {ingredient.id}
          </p>
          <p>
            <span className="font-extrabold">Cadastrado em:</span>{" "}
            {new Date(ingredient.createdAt).toLocaleDateString("pt-BR")}
          </p>
          <p>
            <span className="font-extrabold">Última atualização:</span>{" "}
            {new Date(ingredient.updatedAt).toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>

      {/* Aviso sobre impacto */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="font-extrabold text-yellow-900 tracking-wider mb-2">⚠️ Atenção</h3>
        <p className="text-sm text-yellow-800 tracking-wider">
          Alterar informações do insumo pode afetar o cálculo de custos das receitas que o utilizam. Certifique-se de
          que os dados estejam corretos antes de salvar.
        </p>
      </div>
    </div>
  )
}
