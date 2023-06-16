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

    const response = await octokit.rest.git.deleteRef({
      owner: repoOwner!,
      repo: repoName!,
      ref: repoBranch!,
    })

    return new Response(JSON.stringify(response.data))

  } else {
    return new Response('No owner or repo name provided')
  }
}


