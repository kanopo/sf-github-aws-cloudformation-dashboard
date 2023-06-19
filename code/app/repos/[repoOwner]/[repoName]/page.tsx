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

  const files = [
    "deploy.yml",
    "delete.yml",
  ]





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

  const uploadDeployScript = async () => {
    const res = await fetch("/api/actions?" + new URLSearchParams({
      repoOwner: repoOwner,
      repoName: repoName,
      fileToDeploy: files[0],
    }), {
      method: 'POST',
    })

    if (res.status === 200) {
      alert("Deploy script uploaded")
    }
    else {
      alert("Something went wrong")
    }

  }
  const uploadDeleteScript = async () => {
    const res = await fetch("/api/actions?" + new URLSearchParams({
      repoOwner: repoOwner,
      repoName: repoName,
      fileToDeploy: files[1],
    }), {
      method: 'POST',
    })

    if (res.status === 200) {
      alert("Delete script uploaded")
    }
    else {
      alert("Something went wrong")
    }

  }

  const onChangeBranchInputName = (e: React.ChangeEvent<HTMLInputElement>) => {

    //TODO: check if branch name is valid
    //VALID patterns  are:
    // - a-zA-Z0-9/-/_/.



    setNewBranch(e.target.value)
  }

  const createNewBranch = () => {
    //TODO: check if branch already exists

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
      <div className="border-2 border-dashed p-2 mb-4">
        <p>Repo name: {repo?.full_name}</p>
        <p>Description: {repo?.description}</p>
        <p>Language: {repo?.language}</p>
      </div>

      <div className="min-w-full border-2 border-dashed p-2 mb-4 flex justify-between items-center">
        <h1>Deploy scripts to github</h1>
        <div>
          <button onClick={uploadDeployScript}>Upload Deploy</button>
          <button onClick={uploadDeleteScript}>Upload Delete</button>
        </div>
      </div>

      <div className="min-w-full border-2 border-dashed p-2 mb-4 flex flex-wrap justify-between items-center">
        <p>Create new branch</p>
        <div className="flex flex-wrap justify-center items-center">
          <input value={newBranch} onChange={onChangeBranchInputName} className="mr-2 border-2" />
          <button onClick={createNewBranch}>Create new branch</button>
        </div>
      </div>

      {branches.length > 0 && <BranchList repoData={repo} />}

    </div>
  )
}

export default Page;
