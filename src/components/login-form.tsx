'use client'
import { Toilet, Eye, EyeOff } from "lucide-react" // icones que vou usar para visualização da senha
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from "@/services/firebaseConfig"
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import Loading from "./loading"

export default function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [isSeeingPassword, setIsSeeingPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    signInWithEmailAndPassword(email, password)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center gap-2 font-medium">
              <div className="flex items-center justify-center rounded-md">
                <Toilet className="size-10" />
              </div>
              <span className="sr-only">Easyout App</span>
            </div>
            <h1 className="text-xl font-bold">Login to Easyout App</h1>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline underline-offset-4 hover:text-blue-500">
                Sign up
              </a>
            </div>
            {error && <p className="text-red-500 text-sm">Erro ao validar credenciais</p>}
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Label htmlFor="password" className="pt-2">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={isSeeingPassword ? "text" : "password"}
                  placeholder="***********"
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#09090B] hover:bg-[#09090B]"
                  onClick={() => setIsSeeingPassword(!isSeeingPassword)}
                  aria-label={isSeeingPassword ? "Hide password" : "Show password"}
                >
                  {isSeeingPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
