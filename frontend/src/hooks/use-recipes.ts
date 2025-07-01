"use client"

import { useState, useEffect, useCallback } from "react"
import { api, type Recipe, type CreateRecipeData } from "@/lib/api"

// Função utilitária para conversão segura de string para number
const safeNumber = (value: unknown): number | undefined => {
  if (value === null || value === undefined || value === "") return undefined
  const num = Number(value)
  return isNaN(num) ? undefined : num
}

export function useRecipes(categoryId?: string) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRecipes = useCallback(async () => {
    try {
      setLoading(true)
      const data = await api.getRecipes(safeNumber(categoryId)) // Corrigido: categoryId convertido para number
      setRecipes(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar receitas")
    } finally {
      setLoading(false)
    }
  }, [categoryId])

  useEffect(() => {
    fetchRecipes()
  }, [fetchRecipes])

  const createRecipe = async (data: CreateRecipeData) => {
    try {
      const newRecipe = await api.createRecipe(data)
      setRecipes((prev) => [newRecipe, ...prev])
      return newRecipe
    } catch (err) {
      throw err instanceof Error ? err : new Error("Erro ao criar receita")
    }
  }

  const updateRecipe = async (id: string, data: Partial<CreateRecipeData>) => {
    try {
      const updatedRecipe = await api.updateRecipe(id, data)
      setRecipes((prev) =>
        prev.map((recipe) => (recipe.id === id ? updatedRecipe : recipe))
      )
      return updatedRecipe
    } catch (err) {
      throw err instanceof Error ? err : new Error("Erro ao atualizar receita")
    }
  }

  const deleteRecipe = async (id: string) => {
    try {
      await api.deleteRecipe(id)
      setRecipes((prev) => prev.filter((recipe) => recipe.id !== id))
    } catch (err) {
      throw err instanceof Error ? err : new Error("Erro ao deletar receita")
    }
  }

  return {
    recipes,
    loading,
    error,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    refetch: fetchRecipes,
  }
}

export function useRecipe(id: string) {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRecipe = useCallback(async () => {
    if (!id) return

    try {
      setLoading(true)
      const data = await api.getRecipe(id)
      setRecipe(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar receita")
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchRecipe()
  }, [fetchRecipe])

  return { recipe, loading, error, refetch: fetchRecipe }
}
