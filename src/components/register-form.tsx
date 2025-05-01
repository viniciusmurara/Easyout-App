'use client'
import { Toilet, Eye, EyeOff } from "lucide-react" // Adicione os ícones de visualização
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/services/firebaseConfig";
import Loading from "./loading"

export default function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth)
  const [isSeeingPassword, setIsSeeingPassword] = useState(false) // Estado para controlar a visibilidade
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(email, password);

      if (userCredential?.user) {
        await setDoc(doc(db, "users", userCredential.user.uid), {
          name: email.split('@')[0],
          email: email,
          createdAt: new Date(),
        });

        router.push('/');
      }
    } catch (error) {
      console.error("Erro no registro:", error);
    }
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
            <h1 className="text-xl font-bold">Register on Easyout App</h1>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4 hover:text-blue-500">
                Sign in
              </a>
            </div>
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
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
              Register
            </Button>
          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>
          <div className="w-full">
            <Button variant="outline" type="button" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Register with Google
            </Button>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-blue-500 text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}