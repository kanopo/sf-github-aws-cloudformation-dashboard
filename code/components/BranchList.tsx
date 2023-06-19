'use client'

import { FC, useState, useEffect } from "react"
import { Branch } from "@/types/Octokit"
import { GitHubRepo } from "@/types/Octokit"

interface Props {
  repoData: GitHubRepo
}


// TODO: Add last commit date for each branch
// https://stackoverflow.com/questions/45726013/how-can-i-get-last-commit-from-github-api

const BranchList: FC<Props> = ({ repoData }: Props) => {

  const [branches, setBranches] = useState<Branch[]>([])

  useEffect(() => {
    fetch("/api/branches?" + new URLSearchParams({
      repoOwner: repoData.owner.login,
      repoName: repoData.name
    }), {
      cache: 'no-store',
      next: {
        revalidate: 0,
      }
    })
      .then(res => res.json())
      .then((data: Branch[]): void => setBranches(data))
  }, [])





  const deleteBrach = async (event: any) => {
    console.log(event.target.id)

    const branchName = event.target.id

    const res = await fetch("/api/delete?" + new URLSearchParams({
      repoOwner: repoData.owner.login,
      repoName: repoData.name,
      repoBranch: branchName
    }), {
      method: 'GET',
    })


    if (res.status === 200) {
      console.log("Branch deleted")
      alert("Branch deleted")
      setBranches(branches.filter((branch: Branch) => branch.name !== branchName))
    }
    else {
      console.log("Error deleting branch")
      alert("Error deleting branch")
    }

  }






  return (
    <div className="min-w-full border-2 border-dashed p-2">
      {branches.map((branch: Branch) => (
        <div key={branch.name} className="border-2 p-2 my-2 flex justify-between items-center">
          <p>{branch.name}</p>
          <button id={branch.name} onClick={deleteBrach}>X</button>
        </div>
      ))}

    </div>
  )
}

export default BranchList

