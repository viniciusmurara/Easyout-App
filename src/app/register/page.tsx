'use client'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/services/firebaseConfig'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import RegisterForm from '@/components/register-form'
import Loading from '@/components/loading'

export default function RegisterPage() {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  )
}