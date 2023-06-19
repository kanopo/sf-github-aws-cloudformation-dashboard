import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"


const PASSWORD = process.env.PASSWORD
const options: NextAuthOptions = {

  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        password: { label: "Password", type: "password" }
      },

      // @ts-ignore
      async authorize(credentials, req) {
        if (credentials?.password === PASSWORD) {
          return { id: 1, name: 'Admin' }
        }

        return null
      }
    }),
  ],
}

const handler = NextAuth(options)
export { handler as GET, handler as POST }
