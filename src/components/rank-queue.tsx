import { Medal, Trophy } from "lucide-react"

interface UserProps {
    name: string
    image: any
    exits: number
    rounded: "top" | "bottom" | "none"
    className?: string
    first: boolean
}

export default function RankQueue({ name, image, exits, rounded, className, first }: UserProps) {
    return (
        <div className={`flex items-center justify-between py-4 px-4 ${className}
            ${rounded === "top" ? "rounded-t-2xl" : rounded === "bottom" ? "rounded-b-2xl" : ""}`}
        >
            <div className="flex items-center text-start  gap-4">
                <div className="relative flex items-center justify-center px-4 bg-zinc-600 h-10 w-10 rounded-full">
                    <div>
                        {image}
                    </div>
                    {first && (
                        <div className="absolute flex items-center justify-center -bottom-2 -right-2 h-6 w-6 bg-zinc-600 rounded-full">
                            <Trophy size={14} className="text-yellow-500 " />
                        </div>
                    )}
                </div>
                <div className="space-y-0.5">
                    <h1 className="text-zinc-800">{name}</h1>
                    <p className="text-xs text-zinc-400">{exits} {exits > 1 ? "saídas" : "saída"}  de sala</p>
                </div>
            </div>
        </div>
    )
}