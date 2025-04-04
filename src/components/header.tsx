'use client'

import { LogOut, Toilet } from "lucide-react";
import { auth } from "@/services/firebaseConfig";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            router.push('/login');
            router.refresh();
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
            alert("Erro ao fazer logout");
        }
    };

    return (
        <div className="flex items-center justify-between w-full px-6 py-6">
            <div className="flex items-center gap-2">
                <Toilet size={32}/>
                <h1 className="text-2xl font-semibold">Easyout App</h1>
            </div>
            <button 
                onClick={handleLogout}
                className="flex items-center gap-2 cursor-pointer hover:text-zinc-300 transition-colors"
            >
                <p className="text-lg">Logout</p>
                <LogOut size={20}/>
            </button>
        </div>
    )
}