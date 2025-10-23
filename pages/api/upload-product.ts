import type { NextApiRequest, NextApiResponse } from "next"
import formidable from "formidable"
import fs from "fs"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

export const config = { api: { bodyParser: false } }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end()
  const form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Error parsing form" })
    try {
      const file = files.file as formidable.File
      const title = String(fields.title || "")
      const description = String(fields.description || "")
      const price = Number(fields.price || 0)
      const stock = Number(fields.stock || 0)

      if (!file || !file.filepath) return res.status(400).json({ error: "No file uploaded" })

      const buffer = fs.readFileSync(file.filepath)
      const safeName = `${Date.now()}_${file.originalFilename}`.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "")
      const { error: uploadError } = await supabaseAdmin.storage.from("products").upload(safeName, buffer, { upsert: true })
      if (uploadError) return res.status(500).json({ error: uploadError.message })

      const { data: publicData } = supabaseAdmin.storage.from("products").getPublicUrl(safeName)
      const image_url = publicData?.publicUrl || null

      const { data, error } = await supabaseAdmin.from("products").insert([{ title, description, price, stock, image_url }]).select().single()
      if (error) return res.status(500).json({ error: error.message })

      return res.status(201).json(data)
    } catch (e: any) {
      return res.status(500).json({ error: e?.message || "Upload failed" })
    }
  })
}