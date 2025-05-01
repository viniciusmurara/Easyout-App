'use client'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/services/firebaseConfig'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Loading from '@/components/loading'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return <Loading />
  }

  return user ? children : null
}