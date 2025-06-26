"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { InsumoForm } from "@/components/insumos/insumos-form";
import { ArrowLeft } from "lucide-react"
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

export default function NovoInsumoPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: InsumoFormData) => {
    setIsLoading(true)

    try {
      // Simular chamada para API
      console.log("Dados do insumo:", data)

      // Aqui você faria a chamada real para sua API
      // const response = await fetch('/api/insumos', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // })

      // Simular delay da API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mostrar mensagem de sucesso
      alert("Insumo cadastrado com sucesso!")

      // Redirecionar para a lista de insumos
      router.push("/insumos")
    } catch (error) {
      console.error("Erro ao cadastrar insumo:", error)
      alert("Erro ao cadastrar insumo. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/insumos")
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
      <InsumoForm onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isLoading} mode="create" />

      {/* Informações adicionais */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 max-w-4xl mx-auto">
        <h3 className="font-medium text-green-900 mb-3">💡 Dicas para cadastro de insumos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800">
          <div>
            <h4 className="font-medium mb-2">Informações Essenciais:</h4>
            <ul className="space-y-1">
              <li>• Nome claro e específico do produto</li>
              <li>• Categoria para melhor organização</li>
              <li>• Unidade de medida correta</li>
              <li>• Custo unitário atualizado</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Controle de Estoque:</h4>
            <ul className="space-y-1">
              <li>• Defina um estoque mínimo adequado</li>
              <li>• Mantenha as quantidades atualizadas</li>
              <li>• Configure alertas para reposição</li>
              <li>• Monitore datas de validade</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
