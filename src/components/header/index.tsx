'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import toast from "react-hot-toast"

export function Header() {
    const {data: session} = useSession()

    function handleLogin() {
        try{
            signIn("google")
            toast.success('Bem-vindo')
        }catch (e) {
            toast.error('Erro ao tentar fazer o login')
        }
    }

    return (
        <header className="w-full">
            <div className="flex flex-col justify-between p-4 gap-2 items-center mx-auto md:max-w-7xl md:p-6 md:flex-row">
                <Link href={"/"}>
                    <h1 className="font-bold text-2xl text-blue-500 md:text-3xl">CHRONOTEO</h1>
                </Link>

                {session?.user ? (
                    <div className="flex gap-2 items-center">
                        <Link href={"/agenda"} className="font-medium text-blue-700">agenda</Link>
                        <button className="bg-blue-700 rounded-md p-2 font-medium text-white" onClick={() => signOut()}>
                            {session.user.name}
                        </button>
                    </div>
                    
                ) : (
                    <button onClick={() => handleLogin()} className="rounded-md bg-blue-700 p-2 w-25 text-white font-bold">Login</button>
                )}
            </div>
        </header>
    )
}