"use client"


import { FC, useEffect, useState } from "react";
//@ts-ignore
import { Repo } from "@/types"

/*
* TODO:
* - create page action to deploy the project
*/

interface Props {
  params: {
    repoOwner: string;
    repoName: string;
  }
}

const Page: FC<Props> = (
  { params: { repoOwner, repoName } }
) => {


  const [repo, setRepo] = useState<Repo | null>(null)

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
      .then(data => setRepo(data))

  }, [])

  return (
    <div>
      {repo != undefined && JSON.stringify(repo)}
    </div>
  )
}

export default Page;
