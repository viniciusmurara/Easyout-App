import BathQueue from "@/components/bath-queue";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-svh items-center justify-between">
      <Header />

      <BathQueue />

      <Footer />
    </div>
  )
}
