"use client"

import type React from "react"

import { useState } from "react"
import { Save, X, Tag, FileText, Palette } from "lucide-react"

interface CategoriaFormData {
  name: string
  description: string
}

interface CategoriaFormProps {
  initialData?: Partial<CategoriaFormData>
  onSubmit: (data: CategoriaFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
  mode?: "create" | "edit"
}

export  function CategoriaForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  mode = "create",
}: CategoriaFormProps) {
  const [formData, setFormData] = useState<CategoriaFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
  })

  const [errors, setErrors] = useState<Partial<CategoriaFormData>>({})

  // Cores predefinidas para as categorias
  const predefinedColors = [
    { name: "Azul", value: "bg-blue-500", textColor: "text-blue-700" },
    { name: "Verde", value: "bg-green-500", textColor: "text-green-700" },
    { name: "Roxo", value: "bg-purple-500", textColor: "text-purple-700" },
    { name: "Rosa", value: "bg-pink-500", textColor: "text-pink-700" },
    { name: "Laranja", value: "bg-orange-500", textColor: "text-orange-700" },
    { name: "Vermelho", value: "bg-red-500", textColor: "text-red-700" },
    { name: "Amarelo", value: "bg-yellow-500", textColor: "text-yellow-700" },
    { name: "Indigo", value: "bg-indigo-500", textColor: "text-indigo-700" },
  ]

  const [selectedColor, setSelectedColor] = useState(predefinedColors[0])

  // Sugestões de categorias comuns
  const categorySuggestions = [
    { name: "Bolos", description: "Bolos tradicionais, bolos de festa, cupcakes" },
    { name: "Tortas", description: "Tortas doces e salgadas, quiches, empadas" },
    { name: "Doces", description: "Brigadeiros, beijinhos, trufas, bombons" },
    { name: "Pães", description: "Pães doces, pães salgados, brioches" },
    { name: "Biscoitos", description: "Cookies, biscoitos decorados, bolachas" },
    { name: "Sobremesas", description: "Pudins, mousses, pavês, gelatinas" },
    { name: "Salgados", description: "Coxinhas, pastéis, esfirras, sanduíches" },
    { name: "Bebidas", description: "Sucos, vitaminas, cafés especiais" },
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<CategoriaFormData> = {}

    // Nome é obrigatório
    if (!formData.name.trim()) {
      newErrors.name = "Nome da categoria é obrigatório"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres"
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Nome deve ter no máximo 50 caracteres"
    }

    // Descrição opcional, mas se preenchida deve ter pelo menos 10 caracteres
    if (formData.description.trim() && formData.description.trim().length < 10) {
      newErrors.description = "Descrição deve ter pelo menos 10 caracteres"
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
      console.error("Erro ao salvar categoria:", error)
    }
  }

  const handleInputChange = (field: keyof CategoriaFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSuggestionClick = (suggestion: { name: string; description: string }) => {
    setFormData({
      name: suggestion.name,
      description: suggestion.description,
    })
    setErrors({})
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg max-w-2xl mx-auto">
      {/* Header */}
      <div className={`${selectedColor.value} text-white p-6 rounded-t-2xl`}>
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{mode === "create" ? "Nova Categoria" : "Editar Categoria"}</h2>
            <p className="text-white/90">
              {mode === "create" ? "Organize seus produtos por categoria" : "Atualize os dados da categoria"}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Nome */}
        <div>
          <label className="form-label flex items-center space-x-2">
            <Tag className="w-4 h-4 text-gray-500" />
            <span>Nome da Categoria *</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={`form-input ${errors.name ? "border-red-500 focus:ring-red-500" : ""}`}
            placeholder="Ex: Bolos, Tortas, Doces..."
            disabled={isLoading}
            maxLength={50}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          <p className="text-gray-500 text-xs mt-1">{formData.name.length}/50 caracteres</p>
        </div>

        {/* Descrição */}
        <div>
          <label className="form-label flex items-center space-x-2">
            <FileText className="w-4 h-4 text-gray-500" />
            <span>Descrição</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className={`form-input resize-none ${errors.description ? "border-red-500 focus:ring-red-500" : ""}`}
            rows={3}
            placeholder="Descreva que tipos de produtos pertencem a esta categoria..."
            disabled={isLoading}
            maxLength={200}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          <p className="text-gray-500 text-xs mt-1">{formData.description.length}/200 caracteres</p>
        </div>

        {/* Seletor de Cor */}
        <div>
          <label className="form-label flex items-center space-x-2">
            <Palette className="w-4 h-4 text-gray-500" />
            <span>Cor da Categoria</span>
          </label>
          <div className="grid grid-cols-4 gap-3">
            {predefinedColors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedColor.name === color.name
                    ? "border-gray-400 scale-105"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                disabled={isLoading}
              >
                <div className={`w-full h-8 ${color.value} rounded mb-2`}></div>
                <p className={`text-xs font-medium ${color.textColor}`}>{color.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Preview da Categoria */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Preview da Categoria</h3>
          <div className="flex items-center space-x-3">
            <div className={`${selectedColor.value} text-white px-3 py-1 rounded-full text-sm font-medium`}>
              {formData.name || "Nome da categoria"}
            </div>
            {formData.description && <p className="text-gray-600 text-sm">{formData.description}</p>}
          </div>
        </div>

        {/* Sugestões (apenas no modo criar) */}
        {mode === "create" && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-3">💡 Sugestões de Categorias</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {categorySuggestions.map((suggestion) => (
                <button
                  key={suggestion.name}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-left p-2 rounded hover:bg-blue-100 transition-colors"
                  disabled={isLoading}
                >
                  <p className="font-medium text-blue-900 text-sm">{suggestion.name}</p>
                  <p className="text-blue-700 text-xs">{suggestion.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

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
                <span>{mode === "create" ? "Criar Categoria" : "Atualizar"}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
