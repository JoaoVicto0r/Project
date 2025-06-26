import { Users, Plus, Search, Edit, Trash2, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"

export default function FornecedorPage() {
  const fornecedores = [
    {
      id: "1",
      name: "Moinho São Paulo",
      email: "contato@moinhosp.com.br",
      phone: "(11) 3456-7890",
      address: "Rua das Indústrias, 123 - São Paulo, SP",
      cnpj: "12.345.678/0001-90",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Chocolates Premium",
      email: "vendas@chocolatespremium.com",
      phone: "(11) 2345-6789",
      address: "Av. Cacau, 456 - São Paulo, SP",
      cnpj: "98.765.432/0001-10",
      isActive: true,
      createdAt: "2024-02-20",
    },
    {
      id: "3",
      name: "Fazenda Verde",
      email: "fazenda@verde.com.br",
      phone: "(11) 1234-5678",
      address: "Estrada Rural, km 15 - Interior, SP",
      cnpj: "11.222.333/0001-44",
      isActive: false,
      createdAt: "2024-01-10",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-500 text-white p-3 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Fornecedores</h1>
            <p className="text-gray-600">Gerencie seus fornecedores e contatos</p>
          </div>
        </div>
        <Link href="/cadastro/fornecedor/novo">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Novo Fornecedor</span>
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{fornecedores.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ativos</p>
              <p className="text-2xl font-bold text-green-600">{fornecedores.filter((f) => f.isActive).length}</p>
            </div>
            <Users className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inativos</p>
              <p className="text-2xl font-bold text-red-600">{fornecedores.filter((f) => !f.isActive).length}</p>
            </div>
            <Users className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar fornecedores..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Fornecedores Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {fornecedores.map((fornecedor) => (
          <div key={fornecedor.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{fornecedor.name}</h3>
                <p className="text-sm text-gray-600 mb-2">CNPJ: {fornecedor.cnpj}</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    fornecedor.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {fornecedor.isActive ? "Ativo" : "Inativo"}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Link href={`/cadastro/fornecedor/${fornecedor.id}/editar`}>
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                </Link>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {fornecedor.email && (
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{fornecedor.email}</span>
                </div>
              )}

              {fornecedor.phone && (
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{fornecedor.phone}</span>
                </div>
              )}

              {fornecedor.address && (
                <div className="flex items-start space-x-3 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-gray-700">{fornecedor.address}</span>
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Cadastrado em {new Date(fornecedor.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {fornecedores.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum fornecedor cadastrado</h3>
          <p className="text-gray-600 mb-6">Comece adicionando seus primeiros fornecedores.</p>
          <Link href="/cadastro/fornecedor/novo">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto hover:bg-blue-600 transition-colors">
              <Plus className="w-5 h-5" />
              <span>Cadastrar Fornecedor</span>
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}
