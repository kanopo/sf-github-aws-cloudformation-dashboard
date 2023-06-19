'use client'

import { FC } from "react"
import { Branch } from "@/types/Octokit"

interface Props {
  branches: Branch[]
}

// TODO: Add last commit date for each branch
// https://stackoverflow.com/questions/45726013/how-can-i-get-last-commit-from-github-api

const BranchList: FC<Props> = ({ branches }: Props) => {




  return (
    <div className="min-w-full border-2 border-dashed p-2">
      {branches.map((branch: Branch) => (
        <div key={branch.name} className="border-2 p-2 my-2 flex justify-between items-center">
          <p>{branch.name}</p>
        </div>
      ))}

    </div>
  )
}

export default BranchList

