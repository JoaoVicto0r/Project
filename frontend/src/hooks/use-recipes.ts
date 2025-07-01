"use client"

import { useState, useEffect, useCallback } from "react"
import { api, type Recipe, type CreateRecipeData } from "@/lib/api"

export function useRecipes(categoryId?: number) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRecipes = useCallback(async () => {
    try {
      setLoading(true)
      const data = await api.getRecipes(categoryId) // categoryId agora é number | undefined
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
