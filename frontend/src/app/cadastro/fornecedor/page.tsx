"use client"

import { useState, useEffect } from "react"
import { Building, Plus, Search, Edit, Trash2, Phone, Mail, MapPin, CreditCard } from "lucide-react"
import Link from "next/link"

interface Fornecedor {
  id: string
  name: string
  email?: string
  phone?: string
  address?: string
  documentType: "cpf" | "cnpj" | "none"
  document?: string
  paymentMethod: "dinheiro" | "cartao" | "pix" | "transferencia" | "boleto"
  pixKey?: string
  pixKeyType?: "cpf" | "cnpj" | "email" | "telefone" | "aleatoria"
  isActive: boolean
  createdAt: string
}

export default function FornecedorPage() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Dados simulados - substitua pela chamada real da API
  useEffect(() => {
    const loadFornecedores = async () => {
      try {
        setLoading(true)
        // Simular delay da API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockFornecedores: Fornecedor[] = [
          {
            id: "1",
            name: "Moinho São Paulo",
            email: "contato@moinhosp.com.br",
            phone: "(11) 3456-7890",
            address: "Rua das Indústrias, 123 - São Paulo, SP",
            documentType: "cnpj",
            document: "12.345.678/0001-90",
            paymentMethod: "pix",
            pixKey: "12.345.678/0001-90",
            pixKeyType: "cnpj",
            isActive: true,
            createdAt: "2024-01-15",
          },
          {
            id: "2",
            name: "Chocolates Premium",
            email: "vendas@chocolatespremium.com",
            phone: "(11) 2345-6789",
            address: "Av. Cacau, 456 - São Paulo, SP",
            documentType: "cnpj",
            document: "98.765.432/0001-10",
            paymentMethod: "transferencia",
            isActive: true,
            createdAt: "2024-02-20",
          },
          {
            id: "3",
            name: "João Silva",
            email: "joao@email.com",
            phone: "(11) 1234-5678",
            address: "Rua das Flores, 789 - São Paulo, SP",
            documentType: "cpf",
            document: "123.456.789-00",
            paymentMethod: "dinheiro",
            isActive: false,
            createdAt: "2024-01-10",
          },
        ]

        setFornecedores(mockFornecedores)
      } catch (error) {
        console.error("Erro ao carregar fornecedores:", error)
      } finally {
        setLoading(false)
      }
    }

    loadFornecedores()
  }, [])

  const filteredFornecedores = fornecedores.filter(
    (fornecedor) =>
      fornecedor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fornecedor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fornecedor.document?.includes(searchTerm),
  )

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este fornecedor?")) {
      try {
        // Aqui você faria a chamada real para a API
        // await api.deleteSupplier(id)
        setFornecedores(fornecedores.filter((f) => f.id !== id))
        alert("Fornecedor excluído com sucesso!")
      } catch (error) {
        console.error("Erro ao excluir fornecedor:", error)
        alert("Erro ao excluir fornecedor")
      }
    }
  }

  const getPaymentMethodLabel = (method: string) => {
    const methods: Record<string, string> = {
      dinheiro: "Dinheiro",
      cartao: "Cartão",
      pix: "PIX",
      transferencia: "Transferência",
      boleto: "Boleto",
    }
    return methods[method] || method
  }

  const getDocumentLabel = (type: string) => {
    const types: Record<string, string> = {
      cpf: "CPF",
      cnpj: "CNPJ",
      none: "Não informado",
    }
    return types[type] || type
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Building className="w-12 h-12 animate-pulse text-indigo-500 mx-auto mb-4" />
          <p className="text-neutral-600 font-extrabold tracking-wider">Carregando fornecedores...</p>
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
            <Building className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-neutral-800 tracking-wider">Fornecedores</h1>
            <p className="text-neutral-600 tracking-wider">Gerencie seus fornecedores e contatos</p>
          </div>
        </div>
        <Link href="/cadastro/fornecedor/novo">
          <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold tracking-wider px-4 py-2 rounded-lg flex items-center space-x-2 transition-all">
            <Plus className="w-4 h-4" />
            <span>Novo Fornecedor</span>
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-extrabold text-neutral-600 tracking-wider">TOTAL</p>
              <p className="text-2xl font-extrabold text-neutral-800 tracking-wider">{fornecedores.length}</p>
            </div>
            <Building className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-extrabold text-neutral-600 tracking-wider">ATIVOS</p>
              <p className="text-2xl font-extrabold text-green-600 tracking-wider">
                {fornecedores.filter((f) => f.isActive).length}
              </p>
            </div>
            <Building className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-extrabold text-neutral-600 tracking-wider">INATIVOS</p>
              <p className="text-2xl font-extrabold text-red-600 tracking-wider">
                {fornecedores.filter((f) => !f.isActive).length}
              </p>
            </div>
            <Building className="w-8 h-8 text-red-500" />
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
              placeholder="Buscar fornecedores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent tracking-wider"
            />
          </div>
          <div className="text-sm font-extrabold text-neutral-600 tracking-wider">
            {filteredFornecedores.length} de {fornecedores.length} fornecedores
          </div>
        </div>
      </div>

      {/* Fornecedores Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFornecedores.map((fornecedor) => (
          <div
            key={fornecedor.id}
            className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="p-4 border-b border-neutral-100">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-extrabold text-neutral-800 tracking-wider mb-1">{fornecedor.name}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    {fornecedor.documentType !== "none" && (
                      <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-2 py-1 rounded text-xs font-extrabold tracking-wider">
                        {getDocumentLabel(fornecedor.documentType)}: {fornecedor.document}
                      </span>
                    )}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wider ${
                        fornecedor.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {fornecedor.isActive ? "ATIVO" : "INATIVO"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Link href={`/cadastro/fornecedor/${fornecedor.id}/editar`}>
                    <button className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(fornecedor.id)}
                    className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="p-4 space-y-3">
              {fornecedor.email && (
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-neutral-400" />
                  <span className="text-neutral-700 font-extrabold tracking-wider">{fornecedor.email}</span>
                </div>
              )}

              {fornecedor.phone && (
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4 text-neutral-400" />
                  <span className="text-neutral-700 font-extrabold tracking-wider">{fornecedor.phone}</span>
                </div>
              )}

              {fornecedor.address && (
                <div className="flex items-start space-x-3 text-sm">
                  <MapPin className="w-4 h-4 text-neutral-400 mt-0.5" />
                  <span className="text-neutral-700 font-extrabold tracking-wider">{fornecedor.address}</span>
                </div>
              )}
            </div>

            {/* Payment Info */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-neutral-500" />
                  <span className="text-sm font-extrabold text-neutral-600 tracking-wider">PAGAMENTO:</span>
                  <span className="text-sm font-extrabold text-neutral-800 tracking-wider">
                    {getPaymentMethodLabel(fornecedor.paymentMethod)}
                  </span>
                </div>
                {fornecedor.paymentMethod === "pix" && fornecedor.pixKey && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-extrabold tracking-wider">
                    PIX: {fornecedor.pixKeyType?.toUpperCase()}
                  </span>
                )}
              </div>

              <div className="mt-2 pt-2 border-t border-neutral-200">
                <p className="text-xs font-extrabold text-neutral-500 tracking-wider">
                  Cadastrado em {new Date(fornecedor.createdAt).toLocaleDateString("pt-BR")} • ID: {fornecedor.id}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredFornecedores.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-neutral-200">
          <Building className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-extrabold text-neutral-800 tracking-wider mb-2">
            {searchTerm ? "Nenhum fornecedor encontrado" : "Nenhum fornecedor cadastrado"}
          </h3>
          <p className="text-neutral-600 tracking-wider mb-6">
            {searchTerm ? "Tente ajustar o termo de busca." : "Comece adicionando seus primeiros fornecedores."}
          </p>
          {!searchTerm && (
            <Link href="/cadastro/fornecedor/novo">
              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold tracking-wider px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-all">
                <Plus className="w-5 h-5" />
                <span>Cadastrar Primeiro Fornecedor</span>
              </button>
            </Link>
          )}
        </div>
      )}

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-extrabold text-blue-900 tracking-wider mb-3">💡 Dicas para cadastro de fornecedores</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h4 className="font-extrabold tracking-wider mb-2">Informações Essenciais:</h4>
            <ul className="space-y-1 tracking-wider">
              <li>• Nome completo ou razão social</li>
              <li>• Dados de contato atualizados</li>
              <li>• Documento (CPF/CNPJ) quando necessário</li>
              <li>• Forma de pagamento preferida</li>
            </ul>
          </div>
          <div>
            <h4 className="font-extrabold tracking-wider mb-2">Pagamentos PIX:</h4>
            <ul className="space-y-1 tracking-wider">
              <li>• Configure a chave PIX para agilizar pagamentos</li>
              <li>• Escolha o tipo correto da chave</li>
              <li>• Valide as informações antes de salvar</li>
              <li>• Mantenha os dados sempre atualizados</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
