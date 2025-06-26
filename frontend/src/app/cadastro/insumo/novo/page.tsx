"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { InsumoForm } from "@/components/insumos/insumos-form"
import { api, type CreateIngredientData, type Category, type Supplier } from "@/lib/api"

export default function NovoInsumoPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [categoriesData, suppliersData] = await Promise.all([api.getCategories(), api.getSuppliers()])
      setCategories(categoriesData)
      setSuppliers(suppliersData)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    }
  }

  const handleSubmit = async (data: CreateIngredientData) => {
    setLoading(true)

    try {
      await api.createIngredient(data)
      alert("Insumo cadastrado com sucesso!")
      router.push("/insumos")
    } catch (error) {
      console.error("Erro ao cadastrar insumo:", error)
      alert("Erro ao cadastrar insumo. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/insumos")
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-neutral-600">
        <Link href="/insumos" className="flex items-center space-x-1 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-extrabold tracking-wider">Voltar para Insumos</span>
        </Link>
      </div>

      {/* Form */}
      <InsumoForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        categories={categories}
        suppliers={suppliers}
      />

      {/* Informações adicionais */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
        <h3 className="font-extrabold text-indigo-900 tracking-wider mb-3">💡 Dicas para cadastro de insumos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-indigo-800">
          <div>
            <h4 className="font-extrabold tracking-wider mb-2">Informações Essenciais:</h4>
            <ul className="space-y-1 tracking-wider">
              <li>• Nome claro e específico do produto</li>
              <li>• Categoria para melhor organização</li>
              <li>• Unidade de medida correta</li>
              <li>• Custo unitário atualizado</li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold tracking-wider mb-2">Controle de Estoque:</h4>
            <ul className="space-y-1 tracking-wider">
              <li>• Defina um estoque mínimo adequado</li>
              <li>• Mantenha as quantidades atualizadas</li>
              <li>• Configure alertas para reposição</li>
              <li>• Monitore os cálculos automáticos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
