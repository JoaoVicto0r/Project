"use client"

import type React from "react"

import { useState } from "react"
import { Save, X, Building, Mail, Phone, MapPin, FileText, User } from "lucide-react"

interface FornecedorFormData {
  name: string
  email: string
  phone: string
  address: string
  cnpj: string
  isActive: boolean
}

interface FornecedorFormProps {
  initialData?: Partial<FornecedorFormData>
  onSubmit: (data: FornecedorFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
  mode?: "create" | "edit"
}

export  function FornecedorForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  mode = "create",
}: FornecedorFormProps) {
  const [formData, setFormData] = useState<FornecedorFormData>({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    cnpj: initialData?.cnpj || "",
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

    // Validação de CNPJ
    if (formData.cnpj && !/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(formData.cnpj)) {
      newErrors.cnpj = "Formato: 12.345.678/0001-90"
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
      await onSubmit(formData)
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

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
  }

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value)
    handleInputChange("phone", formatted)
  }

  const handleCNPJChange = (value: string) => {
    const formatted = formatCNPJ(value)
    handleInputChange("cnpj", formatted)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{mode === "create" ? "Novo Fornecedor" : "Editar Fornecedor"}</h2>
            <p className="text-blue-100">
              {mode === "create" ? "Cadastre um novo fornecedor" : "Atualize os dados do fornecedor"}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Nome */}
        <div>
          <label className="form-label flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-500" />
            <span>Nome do Fornecedor *</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={`form-input ${errors.name ? "border-red-500 focus:ring-red-500" : ""}`}
            placeholder="Ex: Moinho São Paulo"
            disabled={isLoading}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email e Telefone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span>Email</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`form-input ${errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
              placeholder="contato@fornecedor.com"
              disabled={isLoading}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="form-label flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span>Telefone</span>
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              className={`form-input ${errors.phone ? "border-red-500 focus:ring-red-500" : ""}`}
              placeholder="(11) 99999-9999"
              maxLength={15}
              disabled={isLoading}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* CNPJ */}
        <div>
          <label className="form-label flex items-center space-x-2">
            <FileText className="w-4 h-4 text-gray-500" />
            <span>CNPJ</span>
          </label>
          <input
            type="text"
            value={formData.cnpj}
            onChange={(e) => handleCNPJChange(e.target.value)}
            className={`form-input ${errors.cnpj ? "border-red-500 focus:ring-red-500" : ""}`}
            placeholder="12.345.678/0001-90"
            maxLength={18}
            disabled={isLoading}
          />
          {errors.cnpj && <p className="text-red-500 text-sm mt-1">{errors.cnpj}</p>}
        </div>

        {/* Endereço */}
        <div>
          <label className="form-label flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>Endereço</span>
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="form-input resize-none"
            rows={3}
            placeholder="Rua, número, bairro, cidade, estado"
            disabled={isLoading}
          />
        </div>

        {/* Status */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => handleInputChange("isActive", e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              disabled={isLoading}
            />
            <div>
              <span className="font-medium text-gray-900">Fornecedor Ativo</span>
              <p className="text-sm text-gray-600">
                Fornecedores ativos aparecem nas listagens e podem ser selecionados
              </p>
            </div>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary flex items-center space-x-2"
            disabled={isLoading}
          >
            <X className="w-4 h-4" />
            <span>Cancelar</span>
          </button>

          <button type="submit" className="btn-primary flex items-center space-x-2" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Salvando...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{mode === "create" ? "Cadastrar" : "Atualizar"}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
