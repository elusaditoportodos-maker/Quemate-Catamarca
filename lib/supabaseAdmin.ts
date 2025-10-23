import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Usar SOLO en código server-side (API routes). NO exponer al cliente.
export const supabaseAdmin = createClient(url, serviceRoleKey)