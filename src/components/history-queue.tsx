import { User } from "lucide-react"

interface HistoryQueueProps {
    name: string
    status: string
    rounded: "top" | "bottom" | "none"
    className?: string
    first: boolean
}

export default function HistoryQueue({ name, status, rounded, className, first }: HistoryQueueProps) {
    return (
        <div className={`flex items-center justify-between py-4 px-4 ${className}
            ${rounded === "top" ? "rounded-t-2xl" : rounded === "bottom" ? "rounded-b-2xl" : ""}`}
        >
            <div className="flex items-center text-start  gap-4">
                <div className="flex items-center justify-center px-4 bg-zinc-700 h-10 w-10 rounded-full">
                    <div>
                        <User />
                    </div>
                </div>
                <div className="space-y-0.5">
                    <h1 className="text-zinc-800">{name}</h1>
                    <p className="text-xs text-zinc-500">Última saída {status}</p>
                </div>
            </div>
        </div>
    )
}