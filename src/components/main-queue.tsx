'use client'
import UserQueue from "./user-queue"
import { Button } from "./ui/button"
import HistoryQueue from "./history-queue"
import { History, List } from "lucide-react"
import { addDoc, collection, query, where, orderBy, serverTimestamp, getDocs, getCountFromServer, deleteDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/services/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useEffect, useState } from "react"

export default function MainQueue() {
    const [user] = useAuthState(auth)
    const [showTurnAlert, setShowTurnAlert] = useState(false)
    const [currentTurnQueueId, setCurrentTurnQueueId] = useState<string | null>(null)
    const [queuesSnapshot] = useCollection(
        query(
            collection(db, "queues"),
            orderBy("createdAt")
        )
    )
    const [historySnapshot] = useCollection(
        query(
            collection(db, "history"),
            orderBy("confirmedAt", "desc")
        )
    );

    useEffect(() => {
        if (queuesSnapshot?.docs !== undefined && queuesSnapshot?.docs.length > 0 && user) {
            const firstInQueue = queuesSnapshot.docs[0]
            const queueData = firstInQueue.data()

            if (queueData.userId === user.uid) {
                setCurrentTurnQueueId(firstInQueue.id)
                setShowTurnAlert(true)
            } else {
                setShowTurnAlert(false)
            }
        }
    }, [queuesSnapshot, user])

    const handleConfirmTurn = async () => {
        if (!currentTurnQueueId) return;

        try {
            const queueRef = doc(db, "queues", currentTurnQueueId);
            const queueDoc = await getDoc(queueRef);

            if (queueDoc.exists()) {
                const queueData = queueDoc.data();

                await addDoc(collection(db, "history"), {
                    userName: queueData.userName,
                    userId: queueData.userId,
                    confirmedAt: serverTimestamp(),
                });

                const historyQuery = query(
                    collection(db, "history"),
                    orderBy("confirmedAt", "asc")
                );

                const historySnapshot = await getDocs(historyQuery);

                if (historySnapshot.size > 5) {
                    const excess = historySnapshot.size - 5;
                    for (let i = 0; i < excess; i++) {
                        const oldestDoc = historySnapshot.docs[i];
                        await deleteDoc(doc(db, "history", oldestDoc.id));
                    }
                }

                await deleteDoc(queueRef);
            }

            setShowTurnAlert(false);
        } catch (error: unknown) {
            console.error("Erro ao confirmar a vez:", error);
            alert("Erro ao confirmar uso do banheiro");
        }
    }

    const handleJoinQueue = async () => {
        if (!user) return

        try {
            const userInQueueQuery = query(
                collection(db, "queues"),
                where("userId", "==", user.uid),
            )

            const userInQueueSnapshot = await getDocs(userInQueueQuery)
            if (!userInQueueSnapshot.empty) {
                alert("Você já está na fila!")
                return
            }

            const queueCountQuery = query(
                collection(db, "queues")
            )

            const queueCountSnapshot = await getCountFromServer(queueCountQuery)
            if (queueCountSnapshot.data().count >= 5) {
                alert("A fila está cheia! Tente novamente mais tarde.")
                return
            }

            await addDoc(collection(db, "queues"), {
                userId: user.uid,
                userName: user.displayName || user.email?.split('@')[0],
                createdAt: serverTimestamp()
            })
        } catch (error: unknown) {
            let errorMessage = 'Erro ao entrar na fila';

            if (error instanceof Error) {
                errorMessage += `: ${error.message}`;
            }

            alert(errorMessage);
        }
    }

    return (
        <div className="w-full text-center">
            <Dialog open={showTurnAlert} onOpenChange={setShowTurnAlert}>
                <DialogContent className="sm:max-w-[425px] border-0">
                    <DialogHeader>
                        <DialogTitle>Sua vez chegou! 🚽</DialogTitle>
                        <DialogDescription className="text-foreground">
                            Você é o próximo a usar o banheiro
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 pt-4">
                        <p className="text-sm text-muted-foreground">
                            Pressione Confirmar somente quando voltar do banheiro
                        </p>

                        <Button
                            onClick={handleConfirmTurn}
                            className="w-full"
                        >
                            Confirmar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="flex justify-between px-[14%] mb-2">
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
                                queueId={doc.id}
                                name={data.userName}
                                first={index === 0}
                                status={data.createdAt ? data.createdAt.toDate().toLocaleTimeString('pt-BR') : 'Carregando...'}
                                className={index % 2 === 0 ? "bg-zinc-300" : "bg-zinc-200"}
                                rounded={index === 0 ? "top" : index === queuesSnapshot.docs.length - 1 ? "bottom" : "none"}
                                queueUserId={data.userId}
                                currentUserId={user?.uid}
                            />
                        );
                    })}
                </div>
                <div className="w-1/4 h-[366px] bg-zinc-100 rounded-2xl">
                    {historySnapshot?.docs.map((doc, index) => {
                        const data = doc.data();
                        const confirmedDate = data.confirmedAt?.toDate();

                        return (
                            <HistoryQueue
                                key={doc.id}
                                name={data.userName}
                                status={confirmedDate?.toLocaleTimeString('pt-BR') || 'Horário não disponível'}
                                className={index % 2 === 0 ? "bg-zinc-300" : "bg-zinc-200"}
                                rounded={
                                    index === 0 ? "top" :
                                        index === historySnapshot.docs.length - 1 ? "bottom" :
                                            "none"
                                }
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