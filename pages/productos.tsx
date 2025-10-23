import React from "react"
import ProductList from "@/components/ProductList"

export default function ProductosPage() {
  return (
    <main className="min-h-screen py-12 px-4 bg-background">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Nuestros Productos</h1>
        <ProductList />
      </div>
    </main>
  )
}