"use client"

import type React from "react"

import { useState } from "react"
import { Save, X, Building, Mail, Phone, MapPin, FileText, User, CreditCard, Smartphone } from "lucide-react"

interface FornecedorFormData {
  name: string
  email: string
  phone: string
  address: string
  documentType: "cpf" | "cnpj" | "none"
  document: string
  paymentMethod: "dinheiro" | "cartao" | "pix" | "transferencia" | "boleto"
  pixKey?: string
  pixKeyType?: "cpf" | "cnpj" | "email" | "telefone" | "aleatoria"
  isActive: boolean
}

interface FornecedorFormProps {
  initialData?: Partial<FornecedorFormData>
  onSubmit: (data: FornecedorFormData) => Promise<void>
  onCancel: () => void
  loading?: boolean
  mode?: "create" | "edit"
}

const paymentMethods = [
  { value: "dinheiro", label: "Dinheiro" },
  { value: "cartao", label: "Cartão" },
  { value: "pix", label: "PIX" },
  { value: "transferencia", label: "Transferência Bancária" },
  { value: "boleto", label: "Boleto" },
]

const pixKeyTypes = [
  { value: "cpf", label: "CPF", mask: "000.000.000-00" },
  { value: "cnpj", label: "CNPJ", mask: "00.000.000/0000-00" },
  { value: "email", label: "E-mail", mask: "" },
  { value: "telefone", label: "Telefone", mask: "(00) 00000-0000" },
  { value: "aleatoria", label: "Chave Aleatória", mask: "" },
]

export default function FornecedorForm({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
  mode = "create",
}: FornecedorFormProps) {
  const [formData, setFormData] = useState<FornecedorFormData>({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    documentType: initialData?.documentType || "none",
    document: initialData?.document || "",
    paymentMethod: initialData?.paymentMethod || "dinheiro",
    pixKey: initialData?.pixKey || "",
    pixKeyType: initialData?.pixKeyType || "cpf",
    isActive: initialData?.isActive ?? true,
  })

  const [errors, setErrors] = useState<Partial<FornecedorFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<FornecedorFormData> = {}

    // Nome é obrigatório
    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    // Validação de email
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    // Validação de telefone
    if (formData.phone && !/^$$\d{2}$$\s\d{4,5}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = "Formato: (11) 99999-9999"
    }

    // Validação de documento
    if (formData.documentType !== "none" && !formData.document.trim()) {
      newErrors.document = `${formData.documentType.toUpperCase()} é obrigatório quando selecionado`
    }

    if (formData.documentType === "cpf" && formData.document) {
      if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.document)) {
        newErrors.document = "Formato: 123.456.789-00"
      }
    }

    if (formData.documentType === "cnpj" && formData.document) {
      if (!/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(formData.document)) {
        newErrors.document = "Formato: 12.345.678/0001-90"
      }
    }

    // Validação de PIX
    if (formData.paymentMethod === "pix" && !formData.pixKey?.trim()) {
      newErrors.pixKey = "Chave PIX é obrigatória quando PIX é selecionado"
    }

    if (formData.paymentMethod === "pix" && formData.pixKey && formData.pixKeyType) {
      const keyType = pixKeyTypes.find((type) => type.value === formData.pixKeyType)
      if (keyType?.mask) {
        // Validações específicas por tipo de chave
        if (formData.pixKeyType === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.pixKey)) {
          newErrors.pixKey = "E-mail inválido"
        }
        if (formData.pixKeyType === "telefone" && !/^$$\d{2}$$\s\d{5}-\d{4}$/.test(formData.pixKey)) {
          newErrors.pixKey = "Formato: (11) 99999-9999"
        }
        if (formData.pixKeyType === "cpf" && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.pixKey)) {
          newErrors.pixKey = "Formato: 123.456.789-00"
        }
        if (formData.pixKeyType === "cnpj" && !/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(formData.pixKey)) {
          newErrors.pixKey = "Formato: 12.345.678/0001-90"
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      // Limpar campos condicionais
      const dataToSend = { ...formData }
      if (dataToSend.documentType === "none") {
        dataToSend.document = ""
      }
      if (dataToSend.paymentMethod !== "pix") {
        dataToSend.pixKey = ""
        dataToSend.pixKeyType = undefined
      }

      await onSubmit(dataToSend)
    } catch (error) {
      console.error("Erro ao salvar fornecedor:", error)
    }
  }

  const handleInputChange = (field: keyof FornecedorFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  }

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
  }

  const formatPixKey = (value: string, type: string) => {
    switch (type) {
      case "cpf":
        return formatCPF(value)
      case "cnpj":
        return formatCNPJ(value)
      case "telefone":
        return formatPhone(value)
      default:
        return value
    }
  }

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value)
    handleInputChange("phone", formatted)
  }

  const handleDocumentChange = (value: string) => {
    let formatted = value
    if (formData.documentType === "cpf") {
      formatted = formatCPF(value)
    } else if (formData.documentType === "cnpj") {
      formatted = formatCNPJ(value)
    }
    handleInputChange("document", formatted)
  }

  const handlePixKeyChange = (value: string) => {
    const formatted = formatPixKey(value, formData.pixKeyType || "")
    handleInputChange("pixKey", formatted)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building className="w-6 h-6 text-white" />
            <h3 className="text-xl font-extrabold text-white tracking-wider">
              {mode === "create" ? "Novo Fornecedor" : "Editar Fornecedor"}
            </h3>
          </div>
          <button onClick={onCancel} className="p-2 hover:bg-white/20 rounded-lg transition-colors" disabled={loading}>
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-extrabold text-neutral-800 tracking-wider flex items-center gap-2">
            <div className="w-1 h-6 bg-indigo-500 rounded"></div>
            Informações Básicas
          </h4>

          <div>
            <label className="block text-sm font-extrabold text-neutral-700 mb-2 tracking-wider">
              Nome do Fornecedor *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border border-neutral-300 text-neutral-800 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none tracking-wider transition-all disabled:opacity-50 ${
                  errors.name ? "border-red-500 focus:ring-red-200" : ""
                }`}
                placeholder="Ex: Moinho São Paulo"
                disabled={loading}
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1 font-extrabold tracking-wider">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-extrabold text-neutral-700 mb-2 tracking-wider">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border border-neutral-300 text-neutral-800 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none tracking-wider transition-all disabled:opacity-50 ${
                    errors.email ? "border-red-500 focus:ring-red-200" : ""
                  }`}
                  placeholder="contato@fornecedor.com"
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 font-extrabold tracking-wider">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-extrabold text-neutral-700 mb-2 tracking-wider">Telefone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border border-neutral-300 text-neutral-800 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none tracking-wider transition-all disabled:opacity-50 ${
                    errors.phone ? "border-red-500 focus:ring-red-200" : ""
                  }`}
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                  disabled={loading}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 font-extrabold tracking-wider">{errors.phone}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-extrabold text-neutral-700 mb-2 tracking-wider">Endereço</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 text-neutral-800 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none tracking-wider transition-all resize-none disabled:opacity-50"
                rows={3}
                placeholder="Rua, número, bairro, cidade, estado"
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {/* Document Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-extrabold text-neutral-800 tracking-wider flex items-center gap-2">
            <div className="w-1 h-6 bg-green-500 rounded"></div>
            Documentação
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-extrabold text-neutral-700 mb-2 tracking-wider">
                Tipo de Documento
              </label>
              <select
                value={formData.documentType}
                onChange={(e) => handleInputChange("documentType", e.target.value as "cpf" | "cnpj" | "none")}
                className="w-full px-4 py-3 border border-neutral-300 text-neutral-800 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none tracking-wider transition-all disabled:opacity-50"
                disabled={loading}
              >
                <option value="none">Não informar</option>
                <option value="cpf">CPF</option>
                <option value="cnpj">CNPJ</option>
              </select>
            </div>

            {formData.documentType !== "none" && (
              <div>
                <label className="block text-sm font-extrabold text-neutral-700 mb-2 tracking-wider">
                  {formData.documentType.toUpperCase()} *
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    value={formData.document}
                    onChange={(e) => handleDocumentChange(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border border-neutral-300 text-neutral-800 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none tracking-wider transition-all disabled:opacity-50 ${
                      errors.document ? "border-red-500 focus:ring-red-200" : ""
                    }`}
                    placeholder={formData.documentType === "cpf" ? "123.456.789-00" : "12.345.678/0001-90"}
                    maxLength={formData.documentType === "cpf" ? 14 : 18}
                    disabled={loading}
                  />
                </div>
                {errors.document && (
                  <p className="text-red-500 text-sm mt-1 font-extrabold tracking-wider">{errors.document}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Payment Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-extrabold text-neutral-800 tracking-wider flex items-center gap-2">
            <div className="w-1 h-6 bg-yellow-500 rounded"></div>
            Forma de Pagamento
          </h4>

          <div>
            <label className="block text-sm font-extrabold text-neutral-700 mb-2 tracking-wider">
              Método de Pagamento Preferido
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <select
                value={formData.paymentMethod}
                onChange={(e) => handleInputChange("paymentMethod", e.target.value as any)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 text-neutral-800 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none tracking-wider transition-all disabled:opacity-50"
                disabled={loading}
              >
                {paymentMethods.map((method) => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {formData.paymentMethod === "pix" && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 space-y-4">
              <h5 className="font-extrabold text-green-800 tracking-wider flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                Informações do PIX
              </h5>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-extrabold text-neutral-700 mb-2 tracking-wider">
                    Tipo da Chave PIX *
                  </label>
                  <select
                    value={formData.pixKeyType}
                    onChange={(e) => handleInputChange("pixKeyType", e.target.value as any)}
                    className="w-full px-4 py-3 border border-neutral-300 text-neutral-800 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none tracking-wider transition-all disabled:opacity-50"
                    disabled={loading}
                  >
                    {pixKeyTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-neutral-700 mb-2 tracking-wider">
                    Chave PIX *
                  </label>
                  <input
                    type="text"
                    value={formData.pixKey}
                    onChange={(e) => handlePixKeyChange(e.target.value)}
                    className={`w-full px-4 py-3 border border-neutral-300 text-neutral-800 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none tracking-wider transition-all disabled:opacity-50 ${
                      errors.pixKey ? "border-red-500 focus:ring-red-200" : ""
                    }`}
                    placeholder={
                      pixKeyTypes.find((type) => type.value === formData.pixKeyType)?.mask || "Digite a chave PIX"
                    }
                    disabled={loading}
                  />
                  {errors.pixKey && (
                    <p className="text-red-500 text-sm mt-1 font-extrabold tracking-wider">{errors.pixKey}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="space-y-4">
          <h4 className="text-lg font-extrabold text-neutral-800 tracking-wider flex items-center gap-2">
            <div className="w-1 h-6 bg-purple-500 rounded"></div>
            Configurações
          </h4>

          <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => handleInputChange("isActive", e.target.checked)}
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-neutral-300 rounded disabled:opacity-50"
              disabled={loading}
            />
            <label htmlFor="isActive" className="text-sm font-extrabold text-neutral-700 tracking-wider">
              Fornecedor ativo no sistema
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-6 border-t border-neutral-200">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold tracking-wider rounded-lg px-6 py-3 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {mode === "create" ? "Cadastrar Fornecedor" : "Atualizar Fornecedor"}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-6 py-3 border border-neutral-300 text-neutral-700 font-extrabold tracking-wider rounded-lg hover:bg-neutral-50 transition-all disabled:opacity-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
