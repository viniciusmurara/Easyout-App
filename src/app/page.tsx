import MainQueue from "@/components/main-queue";
import Footer from "@/components/footer";
import Header from "@/components/header";
import AuthGuard from "@/components/auth-guard";

export default function Home() {
  return (
    <AuthGuard>
      <div className="flex flex-col min-h-svh items-center justify-between">
        <Header />
        <MainQueue />
        <Footer />
      </div>
    </AuthGuard>
  )
}
