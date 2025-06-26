"use client"

import { Package, Plus, Search, Edit, Trash2, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"

export default function InsumoPage() {
  const insumos = [
    {
      id: 1,
      name: "Farinha de Trigo Especial",
      description: "Farinha de trigo tipo 1, ideal para bolos e pães",
      unit: "kg",
      unitCost: 4.5,
      stock: 25.5,
      minStock: 10,
      category: { id: 1, name: "Farinhas", color: "bg-yellow-500" },
      supplier: { id: "1", name: "Moinho São Paulo" },
      expirationDate: "2024-08-15",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Chocolate 70% Cacau",
      description: "Chocolate amargo premium para confeitaria",
      unit: "kg",
      unitCost: 28.9,
      stock: 3.2,
      minStock: 5,
      category: { id: 3, name: "Chocolates", color: "bg-orange-500" },
      supplier: { id: "2", name: "Chocolates Premium" },
      expirationDate: "2024-12-20",
      isActive: true,
      createdAt: "2024-02-01",
    },
    {
      id: 3,
      name: "Ovos Orgânicos",
      description: "Ovos frescos de galinhas criadas livres",
      unit: "dúzia",
      unitCost: 8.5,
      stock: 15,
      minStock: 8,
      category: { id: 2, name: "Laticínios", color: "bg-blue-500" },
      supplier: { id: "3", name: "Fazenda Verde" },
      expirationDate: "2024-07-25",
      isActive: true,
      createdAt: "2024-01-20",
    },
    {
      id: 4,
      name: "Açúcar Cristal",
      description: "Açúcar cristal refinado especial",
      unit: "kg",
      unitCost: 3.2,
      stock: 50,
      minStock: 20,
      category: { id: 6, name: "Açúcares", color: "bg-pink-500" },
      supplier: { id: "4", name: "Distribuidora Central" },
      expirationDate: "",
      isActive: true,
      createdAt: "2024-01-10",
    },
  ]

  const lowStockItems = insumos.filter((item) => item.stock <= item.minStock)
  const totalValue = insumos.reduce((acc, item) => acc + item.unitCost * item.stock, 0)
  const activeSuppliers = new Set(insumos.map((item) => item.supplier?.id).filter(Boolean)).size

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const isExpiringSoon = (expirationDate: string) => {
    if (!expirationDate) return false
    const today = new Date()
    const expDate = new Date(expirationDate)
    const diffTime = expDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30 && diffDays > 0
  }

  const isExpired = (expirationDate: string) => {
    if (!expirationDate) return false
    const today = new Date()
    const expDate = new Date(expirationDate)
    return expDate < today
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-green-500 text-white p-3 rounded-xl">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Insumos</h1>
            <p className="text-gray-600">Gerencie seu estoque e controle de insumos</p>
          </div>
        </div>
        <Link href="/cadastro/insumo/novo">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Novo Insumo</span>
          </button>
        </Link>
      </div>

      {/* Alerts */}
      {lowStockItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-medium text-red-800">Atenção: Estoque Baixo</h3>
          </div>
          <p className="text-red-700 text-sm mb-3">
            {lowStockItems.length} insumo(s) com estoque abaixo do mínimo recomendado:
          </p>
          <div className="flex flex-wrap gap-2">
            {lowStockItems.map((item) => (
              <span key={item.id} className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                {item.name} ({item.stock} {item.unit})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Insumos</p>
              <p className="text-2xl font-bold text-gray-900">{insumos.length}</p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Estoque Baixo</p>
              <p className="text-2xl font-bold text-red-600">{lowStockItems.length}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Valor Total</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalValue)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Fornecedores</p>
              <p className="text-2xl font-bold text-purple-600">{activeSuppliers}</p>
            </div>
            <Package className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar insumos..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="">Todas as categorias</option>
              <option value="1">Farinhas</option>
              <option value="2">Laticínios</option>
              <option value="3">Chocolates</option>
              <option value="6">Açúcares</option>
            </select>
          </div>
        </div>
      </div>

      {/* Insumos Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insumos.map((insumo) => (
          <div key={insumo.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            {/* Header do Card */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{insumo.name}</h3>
                  {insumo.stock <= insumo.minStock && (
                    <AlertTriangle className="w-5 h-5 text-red-500" title="Estoque baixo" />
                  )}
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`${insumo.category.color} text-white px-2 py-1 rounded text-xs font-medium`}>
                    {insumo.category.name}
                  </span>
                  {insumo.supplier && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{insumo.supplier.name}</span>
                  )}
                </div>
                {insumo.description && <p className="text-gray-600 text-sm">{insumo.description}</p>}
              </div>
              <div className="flex items-center space-x-1">
                <Link href={`/cadastro/insumo/${insumo.id}/editar`}>
                  <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                </Link>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Informações do Estoque */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Estoque Atual:</span>
                <span className={`font-medium ${insumo.stock <= insumo.minStock ? "text-red-600" : "text-gray-900"}`}>
                  {insumo.stock} {insumo.unit}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Estoque Mínimo:</span>
                <span className="font-medium text-gray-700">
                  {insumo.minStock} {insumo.unit}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Custo Unitário:</span>
                <span className="font-medium text-blue-600">{formatCurrency(insumo.unitCost)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Valor Total:</span>
                <span className="font-bold text-green-600">{formatCurrency(insumo.unitCost * insumo.stock)}</span>
              </div>

              {insumo.expirationDate && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Validade:</span>
                  <span
                    className={`font-medium text-sm ${
                      isExpired(insumo.expirationDate)
                        ? "text-red-600"
                        : isExpiringSoon(insumo.expirationDate)
                          ? "text-yellow-600"
                          : "text-gray-700"
                    }`}
                  >
                    {new Date(insumo.expirationDate).toLocaleDateString("pt-BR")}
                    {isExpired(insumo.expirationDate) && " (Vencido)"}
                    {isExpiringSoon(insumo.expirationDate) && " (Próximo ao vencimento)"}
                  </span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="pt-4 mt-4 border-t border-gray-100 flex justify-between items-center">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  insumo.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}
              >
                {insumo.isActive ? "Ativo" : "Inativo"}
              </span>
              <p className="text-xs text-gray-500">
                Cadastrado em {new Date(insumo.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {insumos.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum insumo cadastrado</h3>
          <p className="text-gray-600 mb-6">Comece adicionando seus primeiros insumos para controlar o estoque.</p>
          <Link href="/cadastro/insumo/novo">
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto hover:bg-green-600 transition-colors">
              <Plus className="w-5 h-5" />
              <span>Cadastrar Primeiro Insumo</span>
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}
