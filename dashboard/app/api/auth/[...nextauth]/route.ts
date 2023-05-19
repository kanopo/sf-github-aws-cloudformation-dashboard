
import NextAuth from "next-auth"
import GithubProvier from "next-auth/providers/github"

const githubClientId = process.env.GITHUB_CLIENT_ID
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET


const authOptions = {
  providers: [
    GithubProvier({
      // @ts-ignore
      clientId: githubClientId,
      // @ts-ignore
      clientSecret: githubClientSecret
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
