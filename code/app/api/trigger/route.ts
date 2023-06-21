export const dynamic = 'force-dynamic'
import { Octokit } from '@octokit/rest';
import { NextRequest } from 'next/server';

// DOCS
// https://octokit.github.io/rest.js/v19#actions

export async function GET(request: NextRequest) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const searchParams = request.nextUrl.searchParams;

  if (searchParams.has("repoName") && searchParams.has("repoOwner") && searchParams.has("repoAction")) {
    const repoOwner = searchParams.get("repoOwner");
    const repoName = searchParams.get("repoName");
    const repoAction = searchParams.get("repoAction");
    const ref = "main"

    const response = await octokit.rest.actions.createWorkflowDispatch({
      owner: repoOwner!,
      repo: repoName!,
      workflow_id: repoAction!,
      ref: ref!,
    });

    console.log(response)

    return new Response(JSON.stringify(response.data), { status: 200 })
  }
  else {
    const response = await octokit.repos.listForAuthenticatedUser({
      per_page: 100,
    });
    return new Response(JSON.stringify(response.data), { status: 400 })
  }
}
