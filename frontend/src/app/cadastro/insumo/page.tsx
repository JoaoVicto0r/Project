"use client"

import { useState, useEffect } from "react"
import { Package, Plus, Search, Filter, AlertTriangle, TrendingUp, TrendingDown, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { api, type Ingredient } from "@/lib/api"

export default function InsumosPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  // Corrigido: tipagem explícita e valor inicial undefined
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined)
  const [showLowStock, setShowLowStock] = useState(false)
  const [stats, setStats] = useState({
    totalIngredients: 0,
    lowStockCount: 0,
    totalStockValue: 0,
    categoriesCount: 0,
  })

  useEffect(() => {
    loadIngredients()
    loadStats()
  }, [selectedCategory, showLowStock])

  const loadIngredients = async () => {
    try {
      setLoading(true)
      // Agora selectedCategory já é number | undefined
      const data = await api.getIngredients(selectedCategory, showLowStock)
      setIngredients(data)
    } catch (error) {
      console.error("Erro ao carregar insumos:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const data = await api.getIngredientStats()
      setStats(data)
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error)
    }
  }

  // Filter ingredients based on search
  const filteredIngredients = ingredients.filter((ingredient: Ingredient) => {
    const matchesSearch =
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ingredient.description?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const getStockStatus = (ingredient: Ingredient) => {
    if (ingredient.stock <= ingredient.minStock) {
      return { status: "low", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" }
    }
    if (ingredient.stock <= ingredient.minStock * 1.5) {
      return { status: "medium", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" }
    }
    return { status: "good", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este insumo?")) {
      try {
        await api.deleteIngredient(id)
        await loadIngredients()
        await loadStats()
      } catch (error) {
        console.error("Erro ao excluir insumo:", error)
        alert("Erro ao excluir insumo")
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Package className="w-12 h-12 animate-pulse text-indigo-500 mx-auto mb-4" />
          <p className="text-neutral-600 font-extrabold tracking-wider">Carregando insumos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-xl">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-neutral-800 tracking-wider">Insumos</h1>
            <p className="text-neutral-600 tracking-wider">Gerencie seu estoque e controle de insumos</p>
          </div>
        </div>
        <Link href="/cadastro/insumo/novo">
          <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold tracking-wider px-4 py-2 rounded-lg flex items-center space-x-2 transition-all">
            <Plus className="w-4 h-4" />
            <span>Novo Insumo</span>
          </button>
        </Link>
      </div>

      {/* Alerts */}
      {stats.lowStockCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-extrabold text-red-800 tracking-wider">Atenção: Estoque Baixo</h3>
          </div>
          <p className="text-red-700 text-sm mb-3 tracking-wider">
            {stats.lowStockCount} insumo(s) com estoque abaixo do mínimo recomendado
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-extrabold text-neutral-600 tracking-wider">TOTAL DE INSUMOS</p>
              <p className="text-2xl font-extrabold text-neutral-800 tracking-wider">{stats.totalIngredients}</p>
            </div>
            <Package className="w-8 h-8 text-indigo-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-extrabold text-neutral-600 tracking-wider">ESTOQUE BAIXO</p>
              <p className="text-2xl font-extrabold text-red-600 tracking-wider">{stats.lowStockCount}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-extrabold text-neutral-600 tracking-wider">VALOR TOTAL</p>
              <p className="text-2xl font-extrabold text-green-600 tracking-wider">
                {formatCurrency(stats.totalStockValue)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-extrabold text-neutral-600 tracking-wider">CATEGORIAS</p>
              <p className="text-2xl font-extrabold text-purple-600 tracking-wider">{stats.categoriesCount}</p>
            </div>
            <Package className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar insumos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent tracking-wider"
              />
            </div>

            <button
              onClick={() => setShowLowStock(!showLowStock)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all font-extrabold tracking-wider ${
                showLowStock
                  ? "bg-red-50 border-red-200 text-red-700"
                  : "border-neutral-300 text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Estoque Baixo</span>
            </button>
          </div>

          <div className="text-sm font-extrabold text-neutral-600 tracking-wider">
            {filteredIngredients.length} de {ingredients.length} insumos
          </div>
        </div>
      </div>

      {/* Ingredients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredIngredients.map((ingredient: Ingredient) => {
          const stockStatus = getStockStatus(ingredient)

          return (
            <div
              key={ingredient.id}
              className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="p-4 border-b border-neutral-100">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-extrabold text-neutral-800 tracking-wider">{ingredient.name}</h3>
                      {ingredient.stock <= ingredient.minStock && <AlertTriangle className="w-4 h-4 text-red-500" />}
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-2 py-1 rounded text-xs font-extrabold tracking-wider">
                        {ingredient.category?.name || "Sem categoria"}
                      </span>
                      {ingredient.supplier && (
                        <span className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-xs font-extrabold tracking-wider">
                          {ingredient.supplier.name}
                        </span>
                      )}
                    </div>

                    {ingredient.description && (
                      <p className="text-neutral-600 text-sm tracking-wider">{ingredient.description}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-1">
                    <Link href={`/cadastro/insumo/${ingredient.id}/editar`}>
                      <button className="p-2 text-neutral-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(ingredient.id)}
                      className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Stock Info */}
              <div className={`p-4 ${stockStatus.bg} ${stockStatus.border} border-t`}>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-extrabold text-neutral-600 tracking-wider mb-1">ESTOQUE ATUAL</p>
                    <p className={`font-extrabold tracking-wider ${stockStatus.color}`}>
                      {ingredient.stock} {ingredient.unit}
                    </p>
                  </div>

                  <div>
                    <p className="font-extrabold text-neutral-600 tracking-wider mb-1">ESTOQUE MÍNIMO</p>
                    <p className="font-extrabold text-neutral-700 tracking-wider">
                      {ingredient.minStock} {ingredient.unit}
                    </p>
                  </div>

                  <div>
                    <p className="font-extrabold text-neutral-600 tracking-wider mb-1">CUSTO UNITÁRIO</p>
                    <p className="font-extrabold text-blue-600 tracking-wider">{formatCurrency(ingredient.unitCost)}</p>
                  </div>

                  <div>
                    <p className="font-extrabold text-neutral-600 tracking-wider mb-1">VALOR TOTAL</p>
                    <p className="font-extrabold text-green-600 tracking-wider">
                      {formatCurrency(ingredient.unitCost * ingredient.stock)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex justify-between items-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wider ${
                    ingredient.isActive ? "bg-green-100 text-green-800" : "bg-neutral-100 text-neutral-800"
                  }`}
                >
                  {ingredient.isActive ? "ATIVO" : "INATIVO"}
                </span>
                <p className="text-xs font-extrabold text-neutral-500 tracking-wider">ID: {ingredient.id}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredIngredients.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-neutral-200">
          <Package className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-extrabold text-neutral-800 tracking-wider mb-2">
            {searchTerm || showLowStock ? "Nenhum insumo encontrado" : "Nenhum insumo cadastrado"}
          </h3>
          <p className="text-neutral-600 tracking-wider mb-6">
            {searchTerm || showLowStock
              ? "Tente ajustar os filtros de busca."
              : "Comece adicionando seus primeiros insumos para controlar o estoque."}
          </p>
          {!searchTerm && !showLowStock && (
            <Link href="/cadastro/insumo/novo">
              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold tracking-wider px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-all">
                <Plus className="w-5 h-5" />
                <span>Cadastrar Primeiro Insumo</span>
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
