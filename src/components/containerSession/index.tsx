'use client'

import { SessionProvider, SessionProviderProps } from "next-auth/react";

export function ContainerSession({children}: SessionProviderProps) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}