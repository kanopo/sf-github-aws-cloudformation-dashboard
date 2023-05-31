

import { NextRequest } from "next/server";
import { Octokit } from "@octokit/core";
import { GetFile } from "@/types/Octokit";
import path from 'path';
import { promises as fs } from 'fs';


export async function GET(request: NextRequest): Promise<Response> {

  return new Response("Hello world", { status: 200 });
}

export async function POST(request: NextRequest): Promise<Response> {

  const searchParams = request.nextUrl.searchParams;


  if (searchParams.has("repoOwner") && searchParams.has("repoName")) {
    const repoOwner = searchParams.get("repoOwner")!;
    const repoName = searchParams.get("repoName")!;
    const repoPath = ".github/workflows/main.yml"

    const commitMessage = "Added workflow"
    const email = process.env.GITHUB_COMMIT_EMAIL!
    const name = process.env.GITHUB_COMMIT_NAME!


    const workflosDir = path.join(process.cwd(), 'workflows');
    const content = await fs.readFile(path.join(workflosDir, 'main.yml'), 'base64');

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });


    try {
      const getResponse = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: repoOwner,
        repo: repoName,
        path: repoPath,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        },
      })


      // File exists

      if (getResponse.status === 200) {
        // file exists
        const data = getResponse.data as GetFile;

        const responsePut = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
          owner: repoOwner,
          repo: repoName,
          path: repoPath,
          message: commitMessage,
          committer: {
            name: name,
            email: email,
          },
          content: content,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          },
          sha: data.sha
        });

        if (responsePut.status === 201) {

          return new Response("Success", { status: 201 })
        }
        else {
          return new Response("Error", { status: 400 });
        }
      }

    } catch (e: any) {
      // TODO: any type becouse im interested only in the status value
      const status = e.status!

      if (status == 404) {

        const responsePut = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
          owner: repoOwner,
          repo: repoName,
          path: repoPath,
          message: commitMessage,
          committer: {
            name: name,
            email: email,
          },
          content: content,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          },
        });

        if (responsePut.status === 201) {
          return new Response("Success", { status: 201 });
        }
        else {
          return new Response("Error", { status: 400 });
        }
      }
    }
    return new Response("Error", { status: 400 });
  }
  else {
    return new Response("Error", { status: 400 });

  }
}
