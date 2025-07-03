"use client"

import { useState, useEffect } from "react"
import { Tag, Plus, Search, Edit, Trash2, Package, ChefHat } from "lucide-react"
import Link from "next/link"

interface Category {
  id: string
  name: string
  description?: string
  color: string
  createdAt: string
  updatedAt: string
  _count: {
    recipes: number
    ingredients: number
  }
}

export default function CategoriaPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Dados simulados - substitua pela chamada real da API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true)
        // Simular delay da API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockCategories: Category[] = [
          {
            id: "1",
            name: "Bolos",
            description: "Bolos tradicionais, bolos de festa, cupcakes e similares",
            color: "bg-blue-500",
            createdAt: "2024-01-15",
            updatedAt: "2024-01-15",
            _count: { recipes: 8, ingredients: 12 },
          },
          {
            id: "2",
            name: "Tortas",
            description: "Tortas doces e salgadas, quiches, empadas",
            color: "bg-green-500",
            createdAt: "2024-01-20",
            updatedAt: "2024-01-20",
            _count: { recipes: 5, ingredients: 8 },
          },
          {
            id: "3",
            name: "Doces",
            description: "Brigadeiros, beijinhos, trufas, bombons e doces em geral",
            color: "bg-pink-500",
            createdAt: "2024-02-01",
            updatedAt: "2024-02-01",
            _count: { recipes: 15, ingredients: 6 },
          },
          {
            id: "4",
            name: "Pães",
            description: "Pães doces, pães salgados, brioches",
            color: "bg-orange-500",
            createdAt: "2024-02-05",
            updatedAt: "2024-02-05",
            _count: { recipes: 3, ingredients: 10 },
          },
        ]

        setCategories(mockCategories)
      } catch (error) {
        console.error("Erro ao carregar categorias:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalReceitas = categories.reduce((acc, cat) => acc + cat._count.recipes, 0)
  const totalInsumos = categories.reduce((acc, cat) => acc + cat._count.ingredients, 0)

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta categoria?")) {
      try {
        // Aqui você faria a chamada real para a API
        // await api.deleteCategory(id)
        setCategories(categories.filter((cat) => cat.id !== id))
        alert("Categoria excluída com sucesso!")
      } catch (error) {
        console.error("Erro ao excluir categoria:", error)
        alert("Erro ao excluir categoria")
      }
    }
  }

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string }> = {
      "bg-blue-500": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
      "bg-green-500": { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
      "bg-pink-500": { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200" },
      "bg-orange-500": { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
      "bg-purple-500": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
      "bg-red-500": { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
      "bg-yellow-500": { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
      "bg-indigo-500": { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
    }
    return colorMap[color] || colorMap["bg-blue-500"]
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Tag className="w-12 h-12 animate-pulse text-indigo-500 mx-auto mb-4" />
          <p className="text-neutral-600 font-extrabold tracking-wider">Carregando categorias...</p>
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
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-wider">Categorias</h1>
            <p className="text-white tracking-wider">Organize suas receitas e insumos</p>
          </div>
        </div>
        <Link href="/cadastro/categoria/novo">
          <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold tracking-wider px-4 py-2 rounded-lg flex items-center space-x-2 transition-all">
            <Plus className="w-4 h-4" />
            <span>Nova Categoria</span>
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-extrabold text-neutral-600 tracking-wider">TOTAL DE CATEGORIAS</p>
              <p className="text-2xl font-extrabold text-neutral-800 tracking-wider">{categories.length}</p>
            </div>
            <Tag className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-extrabold text-neutral-600 tracking-wider">RECEITAS CATEGORIZADAS</p>
              <p className="text-2xl font-extrabold text-blue-600 tracking-wider">{totalReceitas}</p>
            </div>
            <ChefHat className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-extrabold text-neutral-600 tracking-wider">INSUMOS CATEGORIZADOS</p>
              <p className="text-2xl font-extrabold text-green-600 tracking-wider">{totalInsumos}</p>
            </div>
            <Package className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-extrabold text-neutral-600 tracking-wider">MÉDIA POR CATEGORIA</p>
              <p className="text-2xl font-extrabold text-orange-600 tracking-wider">
                {categories.length > 0 ? Math.round((totalReceitas + totalInsumos) / categories.length) : 0}
              </p>
            </div>
            <Tag className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 gap-4">
          <div className="relative">
            <Search className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar categorias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent tracking-wider"
            />
          </div>
          <div className="text-sm font-extrabold text-neutral-600 tracking-wider">
            {filteredCategories.length} de {categories.length} categorias
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => {
          const colorClasses = getColorClasses(category.color)

          return (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="p-4 border-b border-neutral-100">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div
                        className={`${category.color} text-white px-3 py-1 rounded-full text-sm font-extrabold tracking-wider`}
                      >
                        {category.name}
                      </div>
                    </div>
                    {category.description && (
                      <p className="text-neutral-600 text-sm tracking-wider leading-relaxed">{category.description}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-1">
                    <Link href={`/cadastro/categoria/${category.id}/editar`}>
                      <button className="p-2 text-neutral-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className={`p-4 ${colorClasses.bg} ${colorClasses.border} border-t`}>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ChefHat className={`w-4 h-4 ${colorClasses.text}`} />
                      <span className={`font-extrabold tracking-wider ${colorClasses.text}`}>RECEITAS</span>
                    </div>
                    <span className={`font-extrabold tracking-wider ${colorClasses.text}`}>
                      {category._count.recipes}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Package className={`w-4 h-4 ${colorClasses.text}`} />
                      <span className={`font-extrabold tracking-wider ${colorClasses.text}`}>INSUMOS</span>
                    </div>
                    <span className={`font-extrabold tracking-wider ${colorClasses.text}`}>
                      {category._count.ingredients}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex justify-between items-center">
                <p className="text-xs font-extrabold text-neutral-500 tracking-wider">
                  Criada em {new Date(category.createdAt).toLocaleDateString("pt-BR")}
                </p>
                <p className="text-xs font-extrabold text-neutral-500 tracking-wider">ID: {category.id}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-neutral-200">
          <Tag className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-extrabold text-neutral-800 tracking-wider mb-2">
            {searchTerm ? "Nenhuma categoria encontrada" : "Nenhuma categoria cadastrada"}
          </h3>
          <p className="text-neutral-600 tracking-wider mb-6">
            {searchTerm
              ? "Tente ajustar o termo de busca."
              : "Comece criando categorias para organizar suas receitas e insumos."}
          </p>
          {!searchTerm && (
            <Link href="/cadastro/categoria/novo">
              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold tracking-wider px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-all">
                <Plus className="w-5 h-5" />
                <span>Criar Primeira Categoria</span>
              </button>
            </Link>
          )}
        </div>
      )}

      {/* Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
        <h3 className="font-extrabold text-purple-900 tracking-wider mb-3">💡 Dicas para Organização</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-800">
          <div>
            <h4 className="font-extrabold tracking-wider mb-2">Categorias Sugeridas:</h4>
            <ul className="space-y-1 tracking-wider">
              <li>• Bolos e Cupcakes</li>
              <li>• Tortas e Quiches</li>
              <li>• Doces e Sobremesas</li>
              <li>• Pães e Massas</li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold tracking-wider mb-2">Boas Práticas:</h4>
            <ul className="space-y-1 tracking-wider">
              <li>• Use nomes claros e específicos</li>
              <li>• Adicione descrições detalhadas</li>
              <li>• Escolha cores distintas</li>
              <li>• Evite categorias muito genéricas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
