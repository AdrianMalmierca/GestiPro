import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt', //keep the token in JWT, not in the db. So when the user makes login, it creates the token
    //and keep it in cookies. For each request, we check the token and is validated, without db 
  },
  pages: {
    signIn: '/login', //to create my own login page
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) return null

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!passwordMatch) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    //login for the first time (user exists), because in the loggin is the only
    // moment when you have all the data to keep into the token, or when next requests (doesnt exist the user)
    async jwt({ token, user }) { //keeps the data into the token
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    //creates the session object
    async session({ session, token }) { //exposes the data to the frontend
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    },
  },
}