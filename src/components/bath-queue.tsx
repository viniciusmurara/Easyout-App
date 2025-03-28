import { User } from "lucide-react"
import UserQueue from "./user-queue"
import { Button } from "./ui/button"
import RankQueue from "./rank-queue"

const users = [
    { name: "Vinicius Murara", image: <User />, dateTime: "19:10" },
    { name: "Carlos Augusto", image: <User />, dateTime: "19:16" },
    { name: "Filipe Formigari", image: <User />, dateTime: "19:20" },
    { name: "Pedro Gabriel", image: <User />, dateTime: "19:28" },
    { name: "João Paulo", image: <User />, dateTime: "19:31" },
]

const dailyRank = [
    { name: "Kauan Martim", image: <User />, exits: 4 },
    { name: "Saulo Nascimento", image: <User />, exits: 3 },
    { name: "Eduardo Vizoni", image: <User />, exits: 2 },
    { name: "Pedro Gabriel", image: <User />, exits: 2 },
    { name: "João Scheid", image: <User />, exits: 1 },
]

export default function BathQueue() {
    return (
        <div className="w-full text-center min-h-96">
            <div className="flex items-center justify-center gap-4">
                <div className="w-1/2">
                    {users.map((currentUser, index) => {
                        return (
                            <UserQueue
                                name={currentUser.name}
                                image={currentUser.image}
                                dateTime={currentUser.dateTime}
                                key={index}
                                className={index % 2 === 0 ? "bg-zinc-300" : "bg-zinc-200"}
                                rounded={users.indexOf(currentUser) === 0 ? "top"
                                    : users.indexOf(currentUser) === users.length - 1 ? "bottom" : "none"}
                            />
                        )
                    })}
                </div>
                <div className="w-1/4 h-full">
                    {dailyRank.map((currentRank, index) => {
                        return (
                            <RankQueue
                                key={index}
                                name={currentRank.name}
                                image={currentRank.image}
                                first={index === 0}
                                exits={currentRank.exits}
                                className={index % 2 === 0 ? "bg-zinc-300" : "bg-zinc-200"}
                                rounded={dailyRank.indexOf(currentRank) === 0 ? "top"
                                    : dailyRank.indexOf(currentRank) === dailyRank.length - 1 ? "bottom" : "none"}
                            />
                        )
                    })}
                </div>
            </div>

            <Button className="mt-10">
                Entrar na fila
            </Button>
        </div>
    )
}