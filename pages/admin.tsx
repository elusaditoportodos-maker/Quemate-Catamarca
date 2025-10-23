import React from "react"
import dynamic from "next/dynamic"
import ProductList from "@/components/ProductList"

const AdminProductForm = dynamic(() => import("@/components/AdminProductForm"), { ssr: false })

export default function AdminPage() {
  return (
    <main className="min-h-screen py-12 px-4 bg-background">
      <div className="container mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Panel Admin (Pruebas)</h1>
          <p className="text-sm text-muted-foreground mb-4">
            Para pruebas locales pega temporalmente la SUPABASE_SERVICE_ROLE_KEY en el formulario.
            No expongas esa clave en producción.
          </p>
          <AdminProductForm />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Vista previa de productos</h2>
          <ProductList />
        </div>
      </div>
    </main>
  )
}