import type { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "@/lib/supabaseClient"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const method = req.method

    if (method === "GET") {
      // usar cliente público para lecturas
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Supabase GET error:", error)
        return res.status(500).json({ error: error.message || "Error fetching products" })
      }
      return res.status(200).json(Array.isArray(data) ? data : [])
    }

    // Operaciones de escritura protegidas: validar header con service role (solo para testing local)
    const apiKey = String(req.headers["x-service-role-key"] || "")
    if (!apiKey || apiKey !== String(process.env.SUPABASE_SERVICE_ROLE_KEY || "")) {
      return res.status(401).json({ error: "Unauthorized - missing/invalid service role key" })
    }

    if (method === "POST") {
      const { title, description, price, stock = 0, image_url } = req.body
      const { data, error } = await supabaseAdmin
        .from("products")
        .insert([{ title, description, price, stock, image_url }])
        .select()
        .single()

      if (error) {
        console.error("Supabase POST error:", error)
        return res.status(500).json({ error: error.message || "Error inserting product" })
      }
      return res.status(201).json(data)
    }

    if (method === "PUT") {
      const id = String(req.query.id || "")
      if (!id) return res.status(400).json({ error: "Missing id" })
      const updates = req.body
      const { data, error } = await supabaseAdmin.from("products").update(updates).eq("id", id).select().single()
      if (error) {
        console.error("Supabase PUT error:", error)
        return res.status(500).json({ error: error.message || "Error updating product" })
      }
      return res.status(200).json(data)
    }

    if (method === "DELETE") {
      const id = String(req.query.id || "")
      if (!id) return res.status(400).json({ error: "Missing id" })
      const { error } = await supabaseAdmin.from("products").delete().eq("id", id)
      if (error) {
        console.error("Supabase DELETE error:", error)
        return res.status(500).json({ error: error.message || "Error deleting product" })
      }
      return res.status(204).end()
    }

    return res.status(405).end()
  } catch (err: any) {
    console.error("API /api/products unexpected error:", err)
    return res.status(500).json({ error: err?.message || "Internal Server Error" })
  }
}