import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions) //http handler for next-auth. Authentication backend

export { handler as GET, handler as POST } //. Connect it woth re routess
// we export it for both GET and POST requests, so it can handle both sign in and sign out requests