import { Undo2, User } from "lucide-react"

interface UserProps {
    name: string,
    status: string
    rounded: "top" | "bottom" | "none",
    className?: string
}

export default function UserQueue({ name, status, rounded, className }: UserProps) {
    return (
        <div className={`group flex items-center text-start py-4 gap-4 px-4 ${className}
            ${rounded === "top" ? "rounded-t-2xl" : rounded === "bottom" ? "rounded-b-2xl" : ""}`}
        >
            <div className="flex items-center justify-center px-4 bg-zinc-700 h-10 w-10 rounded-full">
                <div>
                    <User />
                </div>
            </div>

            <div className="space-y-0.5">
                <h1 className="text-zinc-800">{name}</h1>
                <p className="text-xs text-zinc-500">Entrou na fila {status}</p>
            </div>

            <div className="flex items-center justify-center ml-auto bg-zinc-700 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Undo2 size={16} />
            </div>
        </div>
    )
}