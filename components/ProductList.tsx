import React, { useEffect, useState } from "react"

type Product = {
  id: string
  title: string
  description?: string
  price: number
  stock: number
  image_url?: string
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch("/api/products")
        const json = await res.json().catch(() => null)

        if (!res.ok) {
          const msg = json?.error?.message || json?.error || `HTTP ${res.status}`
          throw new Error(msg)
        }

        // Normalizar respuesta: puede venir como array directo o { data: [...] }
        let list: any[] = []
        if (Array.isArray(json)) list = json
        else if (json && Array.isArray(json.data)) list = json.data
        else if (json && Array.isArray(json.items)) list = json.items
        else if (json && typeof json === "object" && Object.keys(json).length === 0) list = []
        else {
          throw new Error("Respuesta de productos con formato inesperado")
        }

        if (mounted) setProducts(list)
      } catch (err: any) {
        if (mounted) {
          setError(err?.message || "Error al obtener productos")
          setProducts([])
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <p className="text-center">Cargando productos...</p>
  if (error) return <p className="text-center text-red-500">Error: {error}</p>
  if (products.length === 0) return <p className="text-center">No hay productos</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <div key={p.id} className="bg-card rounded-lg p-4 shadow">
          {p.image_url && <img src={p.image_url} alt={p.title} className="w-full h-48 object-cover rounded mb-3" />}
          <h3 className="font-semibold text-lg">{p.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{p.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-bold">${Number(p.price).toFixed(2)}</span>
            <span className="text-sm text-muted-foreground">Stock: {p.stock}</span>
          </div>
        </div>
      ))}
    </div>
  )
}