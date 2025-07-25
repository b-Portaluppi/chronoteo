'use client'

import { CalendarAmostra } from "@/components/calendarAmostra";
import { db } from "@/services/firebaseConfig";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

interface ValoresProps {
    description: string,
    dia: Date;
    name: any
}

export function Container() {
    const [dia, setDia] = useState<Date>(new Date)
    const [description, setDescription] = useState("")
    const [valores, setValores] = useState<ValoresProps[]>([])

    const { data: session } = useSession();

    function handleSubmit(event: FormEvent) {
        event.preventDefault()

        try {
            addAgenda()

            setDescription("")
            toast.success("Item adicionado com sucesso")
        }catch(e) {
            toast.error("Erro ao adicionar item. Tente novamente!")
        }
    }

    async function addAgenda() {
        await addDoc(collection(db, "agenda"), {
            description: description,
            dia: dia,
            name: session?.user?.name
        })
    }

    return (
        <section className="flex flex-col items-center w-full md:flex-row md:justify-center gap-3.5">
            <CalendarAmostra setData={setDia} data={dia} />

            <div className="p-2 w-full md:max-w-2xl">
                <form onSubmit={handleSubmit}>
                    <textarea
                        name="descricao"             placeholder="Descrição..."
                        className="border-2 w-full p-2 rounded-md md:h-40"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    >    
                    </textarea>

                    <button type="submit" className="bg-blue-500 text-white w-full font-bold rounded-lg p-3">Adicionar</button>
                </form>
            </div>
        </section>
    )
}