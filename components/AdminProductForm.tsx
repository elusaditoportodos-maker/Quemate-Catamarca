import React, { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function AdminProductForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState<number | "">("")
  const [stock, setStock] = useState<number | "">(0)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [adminKey, setAdminKey] = useState("") // para pruebas locales

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // comprobar sesión (cliente)
      const { data: sessionData } = await supabase.auth.getSession()
      if (!sessionData?.session) {
        throw new Error("Debes iniciar sesión antes de subir imágenes")
      }

      let imageUrl: string | undefined = undefined
      if (file) {
        const safeName = `${Date.now()}_${file.name}`.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "")
        const { error: uploadError } = await supabase.storage.from("products").upload(safeName, file, { upsert: true })
        if (uploadError) throw uploadError
        const { data: publicData } = supabase.storage.from("products").getPublicUrl(safeName)
        imageUrl = publicData?.publicUrl
      }

      const body = { title, description, price: Number(price), stock: Number(stock), image_url: imageUrl }
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-service-role-key": adminKey, // solo para testing
        },
        body: JSON.stringify(body),
      })
      const json = await res.json().catch(() => null)
      if (!res.ok) throw json || new Error("Error creando producto")
      setMessage("Producto creado correctamente")
      setTitle("")
      setDescription("")
      setPrice("")
      setStock(0)
      setFile(null)
    } catch (err: any) {
      setMessage(err?.message || "Error al crear producto")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-card p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Crear producto (admin)</h3>

      <label className="block mb-2 text-sm">Título</label>
      <input className="w-full mb-3 px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} />

      <label className="block mb-2 text-sm">Descripción</label>
      <textarea className="w-full mb-3 px-3 py-2" value={description} onChange={(e) => setDescription(e.target.value)} />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block mb-2 text-sm">Precio</label>
          <input type="number" step="0.01" className="w-full mb-3 px-3 py-2" value={price} onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))} />
        </div>
        <div>
          <label className="block mb-2 text-sm">Stock</label>
          <input type="number" className="w-full mb-3 px-3 py-2" value={stock} onChange={(e) => setStock(e.target.value === "" ? "" : Number(e.target.value))} />
        </div>
      </div>

      <label className="block mb-2 text-sm">Imagen</label>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="mb-3" />

      <label className="block mb-2 text-sm">Clave Admin (prueba)</label>
      <input className="w-full mb-4 px-3 py-2" value={adminKey} onChange={(e) => setAdminKey(e.target.value)} placeholder="Pega aquí SUPABASE_SERVICE_ROLE_KEY para pruebas" />

      {message && <p className="mb-3 text-sm">{message}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded">
          {loading ? "Procesando..." : "Crear producto"}
        </button>
      </div>
    </form>
  )
}