import { Toilet, User } from "lucide-react"

interface UserProps {
    name: string
    exits: number
    rounded: "top" | "bottom" | "none"
    className?: string
    first: boolean
}

export default function RankQueue({ name, exits, rounded, className, first }: UserProps) {
    return (
        <div className={`flex items-center justify-between py-4 px-4 ${className}
            ${rounded === "top" ? "rounded-t-2xl" : rounded === "bottom" ? "rounded-b-2xl" : ""}`}
        >
            <div className="flex items-center text-start  gap-4">
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
                    <p className="text-xs text-zinc-500">{exits} {exits > 1 ? "saídas" : "saída"}  de sala</p>
                </div>
            </div>
        </div>
    )
}