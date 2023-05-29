"use client"


import { FC, useEffect, useRef, useState } from "react";
//@ts-ignore
import { Repo, Branch } from "@/types"


interface Props {
  params: {
    repoOwner: string;
    repoName: string;
  }
}

const Page: FC<Props> = (
  { params: { repoOwner, repoName } }
) => {


  const [repo, setRepo] = useState<Repo>(null)
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
      .then((data): Repo => {
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
      .then((data): Branch => setBranches(data))

  }, [])

  const createDeployScript = () => {
    fetch("/api/actions?" + new URLSearchParams({
      repoOwner: repoOwner,
      repoName: repoName
    }), {
      method: 'POST',
    })
      .then(res => res.json())
      .then((data) => console.log(data))
  }


  return (
    <div>
      <p>Repo name: {repo?.full_name}</p>
      <p>Description: {repo?.description}</p>
      <p>Language: {repo?.language}</p>

      <div>
        <h1>Deploy github action inside main branch</h1>
        <button onClick={createDeployScript}>DEPLOY</button>
      </div>


      <div>
        <p>Branches:</p>
        <ul>
          {branches && branches.map((branch: Branch) => (
            <li>{branch.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Page;
