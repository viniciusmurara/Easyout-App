import { User } from "lucide-react"
import UserQueue from "./user-queue"

const users = [
    { name: "Vinicius Murara", image: <User /> },
    { name: "Vinicius Murara", image: <User /> },
    { name: "Vinicius Murara", image: <User /> },
    { name: "Vinicius Murara", image: <User /> },
    { name: "Vinicius Murara", image: <User /> },
    { name: "Vinicius Murara", image: <User /> }
]

export default function BathQueue() {
    return (
        <div className="p-4 w-96 space-y-2">
            {users.map((currentUser) => {
                return <UserQueue name={currentUser.name} image={currentUser.image} />
            })}
        </div>
    )
}