"use client"

import type React from "react"

import { useState } from "react"
import { X, Save, Tag } from "lucide-react"

interface CategoriaFormData {
  name: string
  description: string
  color: string
}

interface CategoriaFormProps {
  initialData?: Partial<CategoriaFormData>
  onSubmit: (data: CategoriaFormData) => Promise<void>
  onCancel: () => void
  loading?: boolean
  mode?: "create" | "edit"
}

const predefinedColors = [
  {
    name: "Azul",
    value: "bg-blue-500",
    textColor: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    name: "Verde",
    value: "bg-green-500",
    textColor: "text-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    name: "Roxo",
    value: "bg-purple-500",
    textColor: "text-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    name: "Rosa",
    value: "bg-pink-500",
    textColor: "text-pink-700",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
  },
  {
    name: "Laranja",
    value: "bg-orange-500",
    textColor: "text-orange-700",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    name: "Vermelho",
    value: "bg-red-500",
    textColor: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    name: "Amarelo",
    value: "bg-yellow-500",
    textColor: "text-yellow-700",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  {
    name: "Indigo",
    value: "bg-indigo-500",
    textColor: "text-indigo-700",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
]

const categorySuggestions = [
  { name: "Bolos", description: "Bolos tradicionais, bolos de festa, cupcakes", color: "bg-blue-500" },
  { name: "Tortas", description: "Tortas doces e salgadas, quiches, empadas", color: "bg-green-500" },
  { name: "Doces", description: "Brigadeiros, beijinhos, trufas, bombons", color: "bg-pink-500" },
  { name: "Pães", description: "Pães doces, pães salgados, brioches", color: "bg-orange-500" },
  { name: "Biscoitos", description: "Cookies, biscoitos decorados, bolachas", color: "bg-purple-500" },
  { name: "Sobremesas", description: "Pudins, mousses, pavês, gelatinas", color: "bg-yellow-500" },
  { name: "Salgados", description: "Coxinhas, pastéis, esfirras, sanduíches", color: "bg-red-500" },
  { name: "Bebidas", description: "Sucos, vitaminas, cafés especiais", color: "bg-indigo-500" },
]

export default function CategoriaForm({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
  mode = "create",
}: CategoriaFormProps) {
  const [formData, setFormData] = useState<CategoriaFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    color: initialData?.color || "bg-blue-500",
  })

  const [error, setError] = useState("")

  const selectedColor = predefinedColors.find((c) => c.value === formData.color) || predefinedColors[0]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.name?.trim()) {
      setError("Nome da categoria é obrigatório")
      return
    }

    if (formData.name.trim().length < 2) {
      setError("Nome deve ter pelo menos 2 caracteres")
      return
    }

    if (formData.name.trim().length > 50) {
      setError("Nome deve ter no máximo 50 caracteres")
      return
    }

    if (formData.description.trim() && formData.description.trim().length < 10) {
      setError("Descrição deve ter pelo menos 10 caracteres")
      return
    }

    await onSubmit(formData)
  }

  const handleSuggestionClick = (suggestion: { name: string; description: string; color: string }) => {
    setFormData({
      name: suggestion.name,
      description: suggestion.description,
      color: suggestion.color,
    })
    setError("")
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Tag className="w-6 h-6 text-white" />
            <h3 className="text-xl font-extrabold text-white tracking-wider">
              {mode === "create" ? "Nova Categoria" : "Editar Categoria"}
            </h3>
          </div>
          <button onClick={onCancel} className="p-2 hover:bg-white/20 rounded-lg transition-colors" disabled={loading}>
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            {error}
          </div>
        )}

        {/* Basic Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-extrabold text-neutral-800 tracking-wider flex items-center gap-2">
            <div className="w-1 h-6 bg-indigo-500 rounded"></div>
            Informações Básicas
          </h4>

          <div>
            <label className="block text-sm font-extrabold text-neutral-700 mb-2 tracking-wider">
              Nome da Categoria *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={loading}
              placeholder="Ex: Bolos, Tortas, Doces..."
              maxLength={50}
              className="w-full px-4 py-3 border border-neutral-300 text-neutral-800 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none tracking-wider transition-all disabled:opacity-50"
            />
            <p className="text-xs text-neutral-500 mt-1 tracking-wider">{formData.name.length}/50 caracteres</p>
          </div>

          <div>
            <label className="block text-sm font-extrabold text-neutral-700 mb-2 tracking-wider">Descrição</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              disabled={loading}
              placeholder="Descreva que tipos de produtos pertencem a esta categoria..."
              maxLength={200}
              className="w-full px-4 py-3 border border-neutral-300 text-neutral-800 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none tracking-wider transition-all resize-none disabled:opacity-50"
            />
            <p className="text-xs text-neutral-500 mt-1 tracking-wider">{formData.description.length}/200 caracteres</p>
          </div>
        </div>

        {/* Color Selection */}
        <div className="space-y-4">
          <h4 className="text-lg font-extrabold text-neutral-800 tracking-wider flex items-center gap-2">
            <div className="w-1 h-6 bg-purple-500 rounded"></div>
            Cor da Categoria
          </h4>

          <div className="grid grid-cols-4 gap-3">
            {predefinedColors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setFormData({ ...formData, color: color.value })}
                disabled={loading}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedColor.name === color.name
                    ? "border-indigo-400 scale-105 shadow-md"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <div className={`w-full h-8 ${color.value} rounded mb-2`}></div>
                <p className={`text-xs font-extrabold tracking-wider ${color.textColor}`}>{color.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <h4 className="text-lg font-extrabold text-neutral-800 tracking-wider flex items-center gap-2">
            <div className="w-1 h-6 bg-green-500 rounded"></div>
            Preview da Categoria
          </h4>

          <div className={`${selectedColor.bgColor} ${selectedColor.borderColor} border rounded-lg p-4`}>
            <div className="flex items-center space-x-3">
              <div
                className={`${selectedColor.value} text-white px-3 py-1 rounded-full text-sm font-extrabold tracking-wider`}
              >
                {formData.name || "Nome da categoria"}
              </div>
              {formData.description && (
                <p className={`text-sm tracking-wider ${selectedColor.textColor}`}>{formData.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Suggestions */}
        {mode === "create" && (
          <div className="space-y-4">
            <h4 className="text-lg font-extrabold text-neutral-800 tracking-wider flex items-center gap-2">
              <div className="w-1 h-6 bg-yellow-500 rounded"></div>
              Sugestões de Categorias
            </h4>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categorySuggestions.map((suggestion) => {
                  const suggestionColor =
                    predefinedColors.find((c) => c.value === suggestion.color) || predefinedColors[0]
                  return (
                    <button
                      key={suggestion.name}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      disabled={loading}
                      className="text-left p-3 rounded-lg border border-indigo-100 hover:bg-white transition-colors"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <div className={`w-3 h-3 ${suggestion.color} rounded-full`}></div>
                        <p className="font-extrabold text-indigo-900 text-sm tracking-wider">{suggestion.name}</p>
                      </div>
                      <p className="text-indigo-700 text-xs tracking-wider">{suggestion.description}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

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
                {mode === "create" ? "Criar Categoria" : "Atualizar Categoria"}
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
