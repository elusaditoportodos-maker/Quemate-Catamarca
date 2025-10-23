import React, { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/router"

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegister, setIsRegister] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSignUp() {
    setLoading(true)
    setMessage(null)
    const { data, error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) return setMessage(error.message)
    // crear perfil server-side (usa tu endpoint /api/create-profile)
    await fetch("/api/create-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: data.user?.id, email })
    }).catch(() => {})
    setMessage("Registro iniciado. Revisa tu email para confirmar.")
  }

  async function handleSignIn() {
    setLoading(true)
    setMessage(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) return setMessage(error.message)
    setMessage("Sesión iniciada")
    // redirigir a panel o recargar
    router.push("/admin").catch(() => router.reload())
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-card/70 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">{isRegister ? "Registrar" : "Iniciar sesión"}</h2>

      <label className="block mb-2 text-sm">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 px-3 py-2 rounded bg-input text-base"
      />

      <label className="block mb-2 text-sm">Contraseña</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 px-3 py-2 rounded bg-input text-base"
      />

      {message && <p className="mb-3 text-sm text-center">{message}</p>}

      <div className="flex gap-3">
        <button
          onClick={isRegister ? handleSignUp : handleSignIn}
          disabled={loading}
          className="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded font-semibold"
        >
          {loading ? "Procesando..." : isRegister ? "Registrar" : "Entrar"}
        </button>

        <button
          onClick={() => setIsRegister(!isRegister)}
          className="px-4 py-2 border rounded"
          type="button"
        >
          {isRegister ? "Ya tengo cuenta" : "Crear cuenta"}
        </button>
      </div>
    </div>
  )
}