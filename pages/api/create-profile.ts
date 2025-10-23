import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { id, email, full_name, role = 'user' } = req.body
  if (!id || !email) return res.status(400).json({ error: 'missing id/email' })

  const { data, error } = await supabaseAdmin
    .from('profiles')
    .upsert({ id, email, full_name, role })

  if (error) return res.status(500).json({ error })
  return res.status(200).json({ data })
}