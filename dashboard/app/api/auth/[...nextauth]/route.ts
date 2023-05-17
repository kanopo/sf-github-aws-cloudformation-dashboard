
import NextAuth from "next-auth"
import GithubProvier from "next-auth/providers/github"


const authOptions = {
  providers: [
    GithubProvier({
      // @ts-ignore
      clientId: process.env.GITHUB_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
