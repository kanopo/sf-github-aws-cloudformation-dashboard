import { NextRequest } from 'next/server'
import { Octokit } from '@octokit/rest'

export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams

  if (searchParams.has('repoName') && searchParams.has('repoOwner')) {
    const repoOwner = searchParams.get('repoOwner')
    const repoName = searchParams.get('repoName')
    const repoBranch = searchParams.get('repoBranch')
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    })

    console.log(repoOwner, repoName, repoBranch)

    const response = await octokit.rest.git.deleteRef({
      owner: repoOwner!,
      repo: repoName!,
      ref: "heads/" + repoBranch!,
    })


    if (response.status === 204) {
      return new Response("Deleted", { status: 200 })
    }
    else {
      return new Response("Not Deleted", { status: 400 })
    }


  } else {
    return new Response('No owner or repo name provided', { status: 400 })
  }
}


