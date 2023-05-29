
// TODO: Create action file inside repository

import { NextRequest } from "next/server";
import { Octokit } from "@octokit/core";


export async function POST(request: NextRequest): Promise<Response> {

  const searchParams = request.nextUrl.searchParams;

  if (!searchParams.has("repoOwner") || !searchParams.has("repoName")) {
    return new Response("Missing owner or repo", { status: 400 });
  }
  else {

    const repoOwner = searchParams.get("owner");
    const repoName = searchParams.get("repo");
    const repoPath = ".github/workflows/main.yml";
    // const repoPath = "test.txt";

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      // owner: repoOwner!,
      // repo: repoName!,
      owner: "kanopo",
      repo: "banana",
      path: repoPath,
      message: 'my commit message',
      committer: {
        name: 'Dmitri Ollari',
        email: 'dmitri.ollari@protonmail.com',
      },
      content: 'bXkgbmV3IGZpbGUgY29udGVudHM=',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    console.log(response);


    if (response.status === 201) {
      return new Response("Success", { status: 201 });
    }
    else {
      return new Response("Error", { status: 400 });
    }


  }

}
// const octokit = new Octokit({
//   auth: 'YOUR-TOKEN'
// })
//
// await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
//   owner: 'OWNER',
//   repo: 'REPO',
//   path: 'PATH',
//   message: 'my commit message',
//   committer: {
//     name: 'Monalisa Octocat',
//     email: 'octocat@github.com'
//   },
//   content: 'bXkgbmV3IGZpbGUgY29udGVudHM=',
//   headers: {
//     'X-GitHub-Api-Version': '2022-11-28'
//   }
// })
