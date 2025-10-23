import { supabase } from './supabaseClient'

export async function uploadProductImage(file: File, key: string) {
  const { data, error } = await supabase.storage.from('products').upload(key, file, { upsert: true })
  if (error) throw error
}