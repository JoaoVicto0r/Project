import type React from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedRoute } from "@/components/auth/protected-routes"

export default function InsumosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  )
}
export const metadata = {
  title: "Cadastro de Insumos",
  description: "Página para cadastrar novos insumos no sistema",
}