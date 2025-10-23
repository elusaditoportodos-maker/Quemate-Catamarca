import React from "react"
import dynamic from "next/dynamic"

const LoginForm = dynamic(() => import("@/components/LoginForm"), { ssr: false })

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-6">
      <LoginForm />
    </main>
  )
}