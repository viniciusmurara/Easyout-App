'use client'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/services/firebaseConfig'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import LoginForm from '@/components/login-form'

export default function LoginPage() {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  if (loading) {
    return <div className="text-center">Carregando...</div>
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}