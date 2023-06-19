

import { NextRequest } from "next/server";
import { Octokit } from "@octokit/core";
import { GetFile } from "@/types/Octokit";
import path from 'path';
import { promises as fs } from 'fs';


type FileExists = {
  exists: boolean,
  data?: GetFile
}

const fileExists = async (repoOwner: string, repoName: string, repoPath: string, octokit: Octokit) => {
  try {
    const getResponse = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: repoOwner,
      repo: repoName,
      path: repoPath,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      },
    });
    if (getResponse.status === 200) {
      return { exists: true, data: getResponse.data as GetFile }
    }
  } catch (e: any) {
    const status = e.status!
    if (status == 404) {
      return { exists: false }
    }
  }
}

const updateFile = async (repoOwner: string, repoName: string, repoPath: string, commitMessage: string, committer: { name: string, email: string }, content: string, sha: string, octokit: Octokit) => {
  const responsePut = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: repoOwner,
    repo: repoName,
    path: repoPath,
    message: commitMessage,
    committer: {
      name: committer.name,
      email: committer.email,
    },
    content: content,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    },
    sha: sha
  });
  if (responsePut.status === 200) {
    return { success: true }
  }
  else {
    return { success: false }
  }


}

const createFile = async (repoOwner: string, repoName: string, repoPath: string, commitMessage: string, committer: { name: string, email: string }, content: string, octokit: Octokit) => {



  const responsePut = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: repoOwner,
    repo: repoName,
    path: repoPath,
    message: commitMessage,
    committer: {
      name: committer.name,
      email: committer.email,
    },
    content: content,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    },
  });

  if (responsePut.status === 201) {
    return { success: true }
  }
  else {
    return { success: false }
  }
}


export async function POST(request: NextRequest): Promise<Response> {
  const searchParams = request.nextUrl.searchParams;

  if (searchParams.has("repoOwner") && searchParams.has("repoName")) {
    const repoOwner = searchParams.get("repoOwner")!;
    const repoName = searchParams.get("repoName")!;
    const fileToDeploy = searchParams.get("fileToDeploy")!;
    // const filesToDeploy = ['deploy.yml', 'delete.yml'];
    const commitMessage = "Added workflow"
    const email = process.env.GITHUB_COMMIT_EMAIL!
    const name = process.env.GITHUB_COMMIT_NAME!



    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
    const res: FileExists = await fileExists(repoOwner, repoName, `.github/workflows/${fileToDeploy}`, octokit) as FileExists;
    const content = await fs.readFile(path.join(process.cwd(), `workflows/${fileToDeploy}`), 'base64');

    if (res.exists) {
      // update file
      const responsePut = await updateFile(repoOwner, repoName, `.github/workflows/${fileToDeploy}`, commitMessage, { name: name, email: email }, content, res.data!.sha, octokit)
      console.log(responsePut)
    }
    else {
      // create file
      const responsePut = await createFile(repoOwner, repoName, `.github/workflows/${fileToDeploy}`, commitMessage, { name: name, email: email }, content, octokit)
      console.log(responsePut)
    }



    return new Response("Ok", { status: 200 });
  }
  else {
    return new Response("Error: missing required parameters", { status: 400 });
  }
}
