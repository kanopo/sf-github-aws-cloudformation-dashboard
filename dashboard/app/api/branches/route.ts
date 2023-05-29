
import { NextRequest } from 'next/server'
import { Octokit } from '@octokit/rest'

export async function GET(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams

  if (searchParams.has('repoName') && searchParams.has('repoOwner')) {
    const repoOwner = searchParams.get('repoOwner')
    const repoName = searchParams.get('repoName')
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    })
    const response = await octokit.repos.listBranches({
      owner: repoOwner!,
      repo: repoName!,
    })
    return new Response(JSON.stringify(response.data))

  } else {
    return new Response('No owner or repo name provided')
  }
}


export async function POST(request: NextRequest): Promise<Response> {

  return new Response('POST request')
}
