import { Toilet, Undo2, User } from "lucide-react"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "@/services/firebaseConfig"

interface UserProps {
    name: string,
    status: string
    rounded: "top" | "bottom" | "none",
    className?: string
    queueUserId: string
    currentUserId?: string
    queueId: string
    first: boolean
}

export default function UserQueue({ name, status, rounded, className, queueUserId, currentUserId, queueId, first }: UserProps) {

    async function handleGetOutQueue() {
        if (!window.confirm("Deseja realmente sair da fila?")) return;

        try {
            await deleteDoc(doc(db, "queues", queueId));
        } catch (error) {
            console.error("Erro ao sair da fila:", error);
        }
    }

    return (
        <div className={`flex items-center text-start py-4 gap-4 px-4 ${className}
            ${rounded === "top" ? "rounded-t-2xl" : rounded === "bottom" ? "rounded-b-2xl" : ""}`}
        >
            <div className="relative flex items-center justify-center px-4 bg-zinc-700 h-10 w-10 rounded-full">
                <div>
                    <User />
                </div>
                {first && (
                    <div className="absolute flex items-center justify-center -bottom-1 -right-2 h-6 w-6 bg-zinc-500 rounded-full">
                        <Toilet size={15} className="text-zinc-100" />
                    </div>
                )}
            </div>

            <div className="space-y-0.5">
                <h1 className="text-zinc-800">{name}</h1>
                {first ? (
                    <p className="text-xs text-zinc-500">Está fora no momento...</p>
                ) : (
                    <p className="text-xs text-zinc-500">Entrou às {status}</p>
                )}
            </div>

            {currentUserId === queueUserId && (
                <div
                    className="flex items-center justify-center ml-auto bg-zinc-700 h-7 w-7 rounded-full cursor-pointer hover:bg-zinc-600"
                    onClick={handleGetOutQueue}
                >
                    <Undo2 size={16} />
                </div>
            )}
        </div>
    )
}