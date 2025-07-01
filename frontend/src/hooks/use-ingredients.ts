"use client"

import { useState, useEffect, useCallback } from "react"
import { api, type Ingredient, type CreateIngredientData } from "@/lib/api"

// Função utilitária para conversão segura de números
const safeNumber = (value: unknown): number | undefined => {
  if (value === null || value === undefined || value === "") return undefined
  const num = Number(value)
  return isNaN(num) ? undefined : num
}

export function useIngredients(categoryId?: number, lowStock?: boolean) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchIngredients = useCallback(async () => {
    try {
      setLoading(true)
      const data = await api.getIngredients(categoryId, lowStock)
      setIngredients(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar ingredientes")
    } finally {
      setLoading(false)
    }
  }, [categoryId, lowStock])

  useEffect(() => {
    fetchIngredients()
  }, [fetchIngredients])

  const createIngredient = async (data: CreateIngredientData) => {
    try {
      const newIngredient = await api.createIngredient(data)
      setIngredients((prev) => [newIngredient, ...prev])
      return newIngredient
    } catch (err) {
      throw err instanceof Error ? err : new Error("Erro ao criar ingrediente")
    }
  }

  const updateIngredient = async (id: string, data: Partial<CreateIngredientData>) => {
    try {
      const updatedIngredient = await api.updateIngredient(id, data)
      setIngredients((prev) => 
        prev.map((ingredient) => 
          ingredient.id === id ? updatedIngredient : ingredient
        )
      )
      return updatedIngredient
    } catch (err) {
      throw err instanceof Error ? err : new Error("Erro ao atualizar ingrediente")
    }
  }

  const deleteIngredient = async (id: string) => {
    try {
      await api.deleteIngredient(id)
      setIngredients((prev) => prev.filter((ingredient) => ingredient.id !== id))
    } catch (err) {
      throw err instanceof Error ? err : new Error("Erro ao deletar ingrediente")
    }
  }

  const updateStock = async (id: string, quantity: number, operation: "add" | "subtract") => {
    try {
      const updatedIngredient = await api.updateStock(id, quantity, operation)
      setIngredients((prev) => 
        prev.map((ingredient) => 
          ingredient.id === id ? updatedIngredient : ingredient
        )
      )
      return updatedIngredient
    } catch (err) {
      throw err instanceof Error ? err : new Error("Erro ao atualizar estoque")
    }
  }

  return {
    ingredients,
    loading,
    error,
    createIngredient,
    updateIngredient,
    deleteIngredient,
    updateStock,
    refetch: fetchIngredients,
  }
}

interface IngredientStats {
  totalIngredients: number
  lowStockCount: number
  totalStockValue: number
  categoriesCount: number
}

export function useIngredientStats() {
  const [stats, setStats] = useState<IngredientStats>({
    totalIngredients: 0,
    lowStockCount: 0,
    totalStockValue: 0,
    categoriesCount: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      const data = await api.getIngredientStats()
      setStats(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar estatísticas")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return { stats, loading, error, refetch: fetchStats }
}

interface StockAlerts {
  lowStock: Ingredient[]
  expiringSoon: Ingredient[]
  alerts: {
    lowStockCount: number
    expiringSoonCount: number
  }
}

export function useStockAlerts() {
  const [alerts, setAlerts] = useState<StockAlerts>({
    lowStock: [],
    expiringSoon: [],
    alerts: {
      lowStockCount: 0,
      expiringSoonCount: 0,
    },
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true)
      const data = await api.getStockAlerts()
      setAlerts(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar alertas")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAlerts()
  }, [fetchAlerts])

  return { alerts, loading, error, refetch: fetchAlerts }
}