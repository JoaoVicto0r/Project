"use client"

import { Tag, Plus, Search, Edit, Trash2, Package, ChefHat } from "lucide-react"
import Link from "next/link"

export default function CategoriaPage() {
  const categorias = [
    {
      id: 1,
      name: "Bolos",
      description: "Bolos tradicionais, bolos de festa, cupcakes e similares",
      color: "bg-blue-500",
      textColor: "text-blue-700",
      bgColor: "bg-blue-50",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
      _count: {
        recipes: 8,
        ingredients: 12,
      },
    },
    {
      id: 2,
      name: "Tortas",
      description: "Tortas doces e salgadas, quiches, empadas",
      color: "bg-green-500",
      textColor: "text-green-700",
      bgColor: "bg-green-50",
      createdAt: "2024-01-20",
      updatedAt: "2024-01-20",
      _count: {
        recipes: 5,
        ingredients: 8,
      },
    },
    {
      id: 3,
      name: "Doces",
      description: "Brigadeiros, beijinhos, trufas, bombons e doces em geral",
      color: "bg-pink-500",
      textColor: "text-pink-700",
      bgColor: "bg-pink-50",
      createdAt: "2024-02-01",
      updatedAt: "2024-02-01",
      _count: {
        recipes: 15,
        ingredients: 6,
      },
    },
    {
      id: 4,
      name: "Pães",
      description: "Pães doces, pães salgados, brioches",
      color: "bg-orange-500",
      textColor: "text-orange-700",
      bgColor: "bg-orange-50",
      createdAt: "2024-02-05",
      updatedAt: "2024-02-05",
      _count: {
        recipes: 3,
        ingredients: 10,
      },
    },
  ]

  const totalReceitas = categorias.reduce((acc, cat) => acc + cat._count.recipes, 0)
  const totalInsumos = categorias.reduce((acc, cat) => acc + cat._count.ingredients, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-500 text-white p-3 rounded-xl">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Categorias</h1>
            <p className="text-gray-600">Organize suas receitas e insumos</p>
          </div>
        </div>
        <Link href="/cadastro/categoria/novo">
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-600 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Nova Categoria</span>
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Categorias</p>
              <p className="text-2xl font-bold text-gray-900">{categorias.length}</p>
            </div>
            <Tag className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Receitas Categorizadas</p>
              <p className="text-2xl font-bold text-blue-600">{totalReceitas}</p>
            </div>
            <ChefHat className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Insumos Categorizados</p>
              <p className="text-2xl font-bold text-green-600">{totalInsumos}</p>
            </div>
            <Package className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Média por Categoria</p>
              <p className="text-2xl font-bold text-orange-600">
                {categorias.length > 0 ? Math.round((totalReceitas + totalInsumos) / categorias.length) : 0}
              </p>
            </div>
            <Tag className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar categorias..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Categorias Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorias.map((categoria) => (
          <div key={categoria.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            {/* Header do Card */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`${categoria.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                    {categoria.name}
                  </div>
                </div>
                {categoria.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">{categoria.description}</p>
                )}
              </div>
              <div className="flex items-center space-x-1">
                <Link href={`/cadastro/categoria/${categoria.id}/editar`}>
                  <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                </Link>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stats do Card */}
            <div className={`${categoria.bgColor} rounded-lg p-4 space-y-2`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ChefHat className={`w-4 h-4 ${categoria.textColor}`} />
                  <span className={`text-sm font-medium ${categoria.textColor}`}>Receitas</span>
                </div>
                <span className={`font-bold ${categoria.textColor}`}>{categoria._count.recipes}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Package className={`w-4 h-4 ${categoria.textColor}`} />
                  <span className={`text-sm font-medium ${categoria.textColor}`}>Insumos</span>
                </div>
                <span className={`font-bold ${categoria.textColor}`}>{categoria._count.ingredients}</span>
              </div>
            </div>

            {/* Footer do Card */}
            <div className="pt-4 mt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Criada em {new Date(categoria.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {categorias.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma categoria cadastrada</h3>
          <p className="text-gray-600 mb-6">Comece criando categorias para organizar suas receitas e insumos.</p>
          <Link href="/cadastro/categoria/novo">
            <button className="bg-purple-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto hover:bg-purple-600 transition-colors">
              <Plus className="w-5 h-5" />
              <span>Criar Primeira Categoria</span>
            </button>
          </Link>
        </div>
      )}

      {/* Dicas */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
        <h3 className="font-medium text-purple-900 mb-3">💡 Dicas para Organização</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-800">
          <div>
            <h4 className="font-medium mb-1">Categorias Sugeridas:</h4>
            <ul className="space-y-1">
              <li>• Bolos e Cupcakes</li>
              <li>• Tortas e Quiches</li>
              <li>• Doces e Sobremesas</li>
              <li>• Pães e Massas</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-1">Boas Práticas:</h4>
            <ul className="space-y-1">
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
