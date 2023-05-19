import NextAuth from "next-auth"
import GithubProvier from "next-auth/providers/github"

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env

const authOptions = {
  providers: [
    GithubProvier({
      // @ts-ignore
      clientId: GITHUB_CLIENT_ID,
      // @ts-ignore
      clientSecret: GITHUB_CLIENT_SECRET,
    })
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
