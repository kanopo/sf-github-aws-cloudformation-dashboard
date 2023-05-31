"use client"

import { FC, useEffect, useState } from "react";
import { Branch } from "@/types/Octokit";
import { GitHubRepo } from "@/types/Octokit";
import BranchList from "@/components/BranchList";

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
  const [newBranch, setNewBranch] = useState<string>('')



  const updateBranches = () => {
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
  }

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
      // TODO: handle error and handle finisced
      .then(res => console.log(res))

  }

  const createNewBranch = () => {
    //TODO: check if branch already exists
    //TODO: check if branch name is valid
    fetch("/api/branches?" + new URLSearchParams({
      repoOwner: repoOwner,
      repoName: repoName,
      branchName: newBranch,
      sha: branches[0].commit.sha
    }), {
      method: 'POST',
    })
      .then((res) => {
        if (res.status === 201) {
          updateBranches()
        }
      })

    setNewBranch('')

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
        <input value={newBranch} onChange={(e) => setNewBranch(e.target.value)} />
        <button onClick={createNewBranch}>Create new branch</button>

      </div>

      {branches.length > 0 && <BranchList branches={branches} />}

    </div>
  )
}

export default Page;
