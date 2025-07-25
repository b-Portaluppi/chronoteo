import { Container } from "./components/container";
import { Busca } from "./components/busca";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";


export default async function Agenda() {
    const session = await getServerSession(authOptions)

    if(!session || !session.user) {
        redirect("/")
    }

    return (
        <main className="flex flex-col my-20">
            <Container />

            <h1 className="my-5 text-center text-3xl font-bold text-blue-500">Minha Agenda</h1>

            <Busca />
        </main>
    )
}