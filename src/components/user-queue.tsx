import { Undo2 } from "lucide-react"

interface UserProps {
    name: string,
    image: any,
    dateTime: string
    rounded: "top" | "bottom" | "none",
    className?: string
}

export default function UserQueue({ name, image, dateTime, rounded, className }: UserProps) {
    return (
        <div className={`flex items-center text-start py-4 gap-4 pl-4 ${className}
            ${rounded === "top" ? "rounded-t-2xl" : rounded === "bottom" ? "rounded-b-2xl" : ""}`}
        >
            <div className="flex items-center justify-center px-4 bg-zinc-600 h-10 w-10 rounded-full">
                <div>
                    {image}
                </div>
            </div>
            <div className="space-y-0.5">
                <h1 className="text-zinc-800">{name}</h1>
                <p className="text-xs text-zinc-400">Entrou na fila {dateTime}</p>  
            </div>
            
            <div className="flex items-center justify-center px-4 bg-zinc-600 h-10 w-10 rounded-full">
                <Undo2 />
            </div>
        </div>
    )
}