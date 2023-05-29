export const dynamic = 'force-dynamic'
import { Octokit } from '@octokit/rest';
import { NextRequest } from 'next/server';


export async function GET(request: NextRequest) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const searchParams = request.nextUrl.searchParams;

  if (searchParams.has("repoName") && searchParams.has("repoOwner")) {
    const repoOwner = searchParams.get("repoOwner");
    const repoName = searchParams.get("repoName");

    const response = await octokit.repos.get({
      owner: repoOwner!,
      repo: repoName!,
    });


    return new Response(JSON.stringify(response.data))
  }
  else {
    const response = await octokit.repos.listForAuthenticatedUser({
      per_page: 100,
    });
    return new Response(JSON.stringify(response.data))
  }
}
