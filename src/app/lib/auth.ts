import { doc, getDoc, setDoc } from 'firebase/firestore';
import GoogleProvider from 'next-auth/providers/google'
import { db } from '@/services/firebaseConfig'

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({session, token, user}: any) {
            if (session?.user) {
                session.user.name = token.name
            }
            return session
        },

        async signIn({user}: any) {
            const newCollection = doc(db, "users", user.email)
            const snapshot = await getDoc(newCollection)

            if(!snapshot.exists()) {
                await setDoc(newCollection, {
                    email: user.email,
                    name: user.name,
                    createdAt: new Date(),
                })
            }

            return true

        }
    }
}