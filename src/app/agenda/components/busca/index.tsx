'use client'

import { db } from "@/services/firebaseConfig";
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

interface ListaProps {
    description: string,
    dia: Date;
    name: string,
    id: string
}

export function Busca() {
    const {data: session} = useSession()
    const [dados, setDados] = useState<ListaProps[]>([])
    const [description, setDescription] = useState<boolean>(false)
    const [editadoId, setEditadoId] = useState("")
    const [newDescription, setNewDescription] = useState("")

    async function buscaAgenda() {
        try{
            const lista:ListaProps[] = []
            const docRef = collection(db, "agenda")
            await getDocs(docRef)
            .then(snapshot => {
                snapshot.forEach(dados => {
                    lista.push({
                        description: dados.data().description,
                        dia: dados.data().dia.toDate(),
                        name: dados.data().name,
                        id: dados.id
                    })
                })
            })
    
            const filtroBusca = lista.filter(item => item.name ===  session?.user?.name)
            setDados(filtroBusca)
        }catch (e) {
        }
    }

    async function excluirItem(id: string) {
        const deleteRef = doc(db, "agenda", id)
        await deleteDoc(deleteRef)
        .then((e) => {
            toast.success("Item excluido com sucesso")
        }).catch(e => {
            toast.error("Erro ao excluir o item. Tente novamente!")
        }) 
    }

    async function editarItem(id: string) {
        try {
            const editarRef = doc(db, "agenda", id)
            await updateDoc(editarRef, {
                description: newDescription
            })

            setDescription(!description)
            toast.success("Item editado com sucesso")
        }catch(e) {
            toast.error("Erro ao editar o item. Tente novamente!")
        }
    }

    buscaAgenda()
    
    return (
        <section className="flex flex-wrap items-center w-full flex-col justify-center gap-6 p-4">
            {dados.map(item => (
                <div key={item.id} className="bg-blue-500 w-full rounded-md flex flex-col p-4 justify-between gap-7"> 
                    <span className="text-white font-bold">
                        {item.dia.getDay()}/{item.dia.getMonth()}/{item.dia.getFullYear()}
                    </span>

                    <div className="flex items-center justify-center max-w-2xl mx-auto">
                        <p className="text-white text-center font-medium">{item.description}</p>
                    </div>

                    <div className="flex items-center mx-auto gap-4">
                        <button onClick={ () => excluirItem(item.id) } className="bg-red-600 text-white font-bold p-2 rounded-md">Excluir</button>
                        <button className="bg-blue-700 text-white font-bold p-2 rounded-md" 
                        onClick={() => {
                            setDescription(!description)
                            setEditadoId(item.id)
                        }}>Editar</button>
                    </div>


                    {description && editadoId === item.id && (
                        <div className="flex flex-col items-center gap-3 w-full">
                            <textarea 
                                name="descriptionEditada" 
                                placeholder="Escreva a nova tarefa..."
                                onChange={(e) => setNewDescription(e.target.value)}
                                className="bg-white font-medium border-2 w-full max-w-2xl p-2 rounded-md outline-none"    
                            >
                            </textarea>
                            
                            <button onClick={() => editarItem(item.id)} className="text-white bg-blue-300 w-full max-w-2xl p-2 rounded-md font-bold text-2xl">Enviar</button>
                        </div>
                    )}
                </div>
            ))}
        </section>
    )
}