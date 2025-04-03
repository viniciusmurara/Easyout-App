'use client'
import UserQueue from "./user-queue"
import { Button } from "./ui/button"
import HistoryQueue from "./history-queue"
import { History, List } from "lucide-react"
import { addDoc, collection, query, where, orderBy, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/services/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

const dailyHistory = [
    { name: "João Scheid", status: "16:20" },
    { name: "Pedro Gabriel", status: "15:36" },
    { name: "Eduardo Vizoni", status: "15:30" },
    { name: "Saulo Nascimento", status: "15:10" },
    { name: "Kauan Martim", status: "14:30" },
]

export default function MainQueue() {
    const [user] = useAuthState(auth)

    const handleJoinQueue = async () => {
        if (!user) return

        try {
            await addDoc(collection(db, "queues"), {
                userId: user.uid,
                userName: user.displayName || user.email?.split('@')[0],
                status: "waiting",
                createdAt: serverTimestamp()
            });

            await addDoc(collection(db, "history"), {
                userId: user.uid,
                action: "entered",
                timestamp: serverTimestamp()
            });

        } catch (error) {
            console.error("Erro ao entrar na fila:", error);
        }
    }

    const [queuesSnapshot] = useCollection(
        query(
            collection(db, "queues"),
            where("status", "==", "waiting"),
            orderBy("createdAt")
        )
    );

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
                    {queuesSnapshot?.docs.map((doc, index) => {
                        const data = doc.data();
                        return (
                            <UserQueue
                                key={doc.id}
                                name={data.userName}
                                status={data.createdAt?.toDate().toLocaleTimeString()}
                                className={index % 2 === 0 ? "bg-zinc-300" : "bg-zinc-200"}
                                rounded={index === 0 ? "top" : index === queuesSnapshot.docs.length - 1 ? "bottom" : "none"}
                            />
                        );
                    })}
                </div>
                <div className="w-1/4 h-[366px] bg-zinc-100 rounded-2xl">
                    {dailyHistory.map((currentRank, index) => {
                        return (
                            <HistoryQueue
                                key={index}
                                name={currentRank.name}
                                first={index === 0}
                                status={currentRank.status}
                                className={index % 2 === 0 ? "bg-zinc-300" : "bg-zinc-200"}
                                rounded={dailyHistory.indexOf(currentRank) === 0 ? "top"
                                    : dailyHistory.indexOf(currentRank) === 4 ? "bottom" : "none"}
                            />
                        )
                    })}
                </div>
            </div>

            <Button className="mt-10" variant={"outline"} onClick={handleJoinQueue}>
                Entrar na fila
            </Button>
        </div>
    )
}