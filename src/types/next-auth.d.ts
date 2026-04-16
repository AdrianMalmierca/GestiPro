import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession['user'] //we dont lose more information, like name, email...
  }

  interface User { //is for the users that we return in the authorize function, so we can keep the role into the token
    role: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
    id: string
  }
}