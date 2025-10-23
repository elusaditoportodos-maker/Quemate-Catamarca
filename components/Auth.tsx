import React, { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function signUp() {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return alert(error.message)

    // Crear perfil (llama a tu API server-side que usa service role)
    await fetch('/api/create-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: data.user?.id, email })
    })

    alert('Registro exitoso, revisa tu email')
  }

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return alert(error.message)
    alert('Sesión iniciada')
  }

  return (
    <div>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
      <button onClick={signUp}>Registrar</button>
      <button onClick={signIn}>Entrar</button>
    </div>
  )
}