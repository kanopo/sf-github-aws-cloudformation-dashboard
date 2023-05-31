"use client"

import { FC, useEffect, useState } from "react";
import { Branch } from "@/types/Octokit";
import { GitHubRepo } from "@/types/Octokit";


interface Props {
  params: {
    repoOwner: string;
    repoName: string;
  }
}

const Page: FC<Props> = (
  { params: { repoOwner, repoName } }
) => {


  const [repo, setRepo] = useState<GitHubRepo>()
  const [branches, setBranches] = useState<Branch[]>([])


  useEffect(() => {
    fetch("/api/repos?" + new URLSearchParams({
      repoOwner: repoOwner,
      repoName: repoName
    }), {
      cache: 'no-store',
      next: {
        revalidate: 0,
      }
    })
      .then(res => res.json())
      .then((data: GitHubRepo): void => {
        setRepo(data)
      })



    fetch("/api/branches?" + new URLSearchParams({
      repoOwner: repoOwner,
      repoName: repoName
    }), {
      cache: 'no-store',
      next: {
        revalidate: 0,
      }
    })
      .then(res => res.json())
      .then((data: Branch[]): void => setBranches(data))

  }, [])

  const createDeployScript = () => {
    fetch("/api/actions?" + new URLSearchParams({
      repoOwner: repoOwner,
      repoName: repoName
    }), {
      method: 'POST',
    })
      .then(res => console.log(res))
  }

  if (!repo) return <p>Loading...</p>


  return (
    <div className="w-[85vw]">
      <div className="border-2 p-2 mb-4">
        <p>Repo name: {repo?.full_name}</p>
        <p>Description: {repo?.description}</p>
        <p>Language: {repo?.language}</p>
      </div>

      <div className="border-2 p-2 mb-4">
        <h1>Deploy github action inside main branch</h1>
        <button onClick={createDeployScript}>DEPLOY</button>
      </div>

      <div className="border-2 p-2 mb-4">
        <p>Create new branch(WIP)</p>

      </div>


      <div className="border-2 p-2">
        <p>Branches:</p>
        {branches && branches.map((branch: Branch) => (
          <div id={branch.name}>
            <p>{branch.name}</p>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Page;
