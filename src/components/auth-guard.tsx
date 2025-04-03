'use client'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/services/firebaseConfig'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [user] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, , router])

  return user ? children : null
}