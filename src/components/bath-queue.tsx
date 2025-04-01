import UserQueue from "./user-queue"
import { Button } from "./ui/button"
import RankQueue from "./rank-queue"
import { History, List } from "lucide-react"

const users = [
    { name: "Vinicius Murara", dateTime: "19:10" },
    { name: "Carlos Augusto", dateTime: "19:16" },
    { name: "Filipe Formigari", dateTime: "19:20" },
    { name: "Pedro Gabriel", dateTime: "19:28" },
    { name: "João Paulo", dateTime: "19:31" }
]

const dailyRank = [
    { name: "Kauan Martim", exits: 4 },
    { name: "Saulo Nascimento", exits: 3 },
    { name: "Eduardo Vizoni", exits: 2 },
    { name: "Pedro Gabriel", exits: 2 },
    { name: "João Scheid", exits: 1 },
]

export default function BathQueue() {
    return (
        <div className="w-full text-center">
            <div className="flex justify-between px-44 mb-2">
                <div className="flex items-center gap-2">
                    <h2 className="text-zinc-100 text-lg">Fila de Espera</h2> <List size={18} />
                </div>
                <div className="flex items-center gap-2">
                    <History size={18} /> <h2 className="text-zinc-100 text-lg">Histórico</h2>
                </div>
            </div>
            <div className="flex items-center justify-center gap-4">
                <div className="w-1/2 h-[366px] bg-zinc-100 rounded-2xl">
                    {users.map((currentUser, index) => {
                        return (
                            <UserQueue
                                name={currentUser.name}
                                dateTime={currentUser.dateTime}
                                key={index}
                                className={index % 2 === 0 ? "bg-zinc-300" : "bg-zinc-200"}
                                rounded={users.indexOf(currentUser) === 0 ? "top"
                                    : users.indexOf(currentUser) === 4 ? "bottom" : "none"}
                            />
                        )
                    })}
                </div>
                <div className="w-1/4 h-[366px] bg-zinc-100 rounded-2xl">
                    {dailyRank.map((currentRank, index) => {
                        return (
                            <RankQueue
                                key={index}
                                name={currentRank.name}
                                first={index === 0}
                                exits={currentRank.exits}
                                className={index % 2 === 0 ? "bg-zinc-300" : "bg-zinc-200"}
                                rounded={dailyRank.indexOf(currentRank) === 0 ? "top"
                                    : dailyRank.indexOf(currentRank) === 4 ? "bottom" : "none"}
                            />
                        )
                    })}
                </div>
            </div>

            <Button className="mt-10" variant={"outline"}>
                Entrar na fila
            </Button>
        </div>
    )
}