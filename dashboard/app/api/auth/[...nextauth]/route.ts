import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

// const handler = NextAuth({
//   providers: [
//
//   ]
// })
// export { handler as GET, handler as POST }


const options: NextAuthOptions = {

  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null

        if (credentials.username === "admin" && credentials.password === "admin") {
          return { credentials }
        }
      }
    }),
  ],
}



const handler = NextAuth(options)
export { handler as GET, handler as POST }
