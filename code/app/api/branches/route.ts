
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

  const searchParams = request.nextUrl.searchParams

  if (
    searchParams.has('repoName') &&
    searchParams.has('repoOwner') &&
    searchParams.has('branchName') &&
    searchParams.has('sha')
  ) {
    const repoOwner = searchParams.get('repoOwner')!
    const repoName = searchParams.get('repoName')!
    const branchName = searchParams.get('branchName')!
    const sha = searchParams.get('sha')!

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    })

    const response = await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
      owner: repoOwner,
      repo: repoName,
      ref: `refs/heads/${branchName}`,
      sha: sha,
      headers: {
        'accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
    })

    return new Response(JSON.stringify(response.data), {status: response.status})



    // https://docs.github.com/en/rest/git/refs?apiVersion=2022-11-28#create-a-reference


  }
  else {
    return new Response('No owner or repo name provided', { status: 400 })
  }

}
