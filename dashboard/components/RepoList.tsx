'use client'


import Link from "next/link"
import { useEffect, useState } from "react"

import { GitHubRepo } from "@/types/Octokit"

const RepoList = () => {

  const [repos, setRepos] = useState<GitHubRepo[]>()
  const [user, setUser] = useState("")

  useEffect(() => {
    fetch('/api/repos', {
      cache: 'no-store',
    })
      .then(res => res.json())
      .then((data: GitHubRepo[]): void => {
        setRepos(data)
        const login = data[0].owner.login
        setUser(login)
      })

  }, [])

  if (!repos) return <div>Loading...</div>


  return (
    <div className="w-[80vw]">
      {user && <h1>Repos for {user}</h1>}

      {repos && repos.map((repo: GitHubRepo) => (
        <div key={repo.id} className="border-2 border-dashed p-4 my-2">
          <Link href={`/repos/${repo.full_name}`}>
            <p>{repo.full_name}</p>
            <p>{repo.description}</p>
            <p>{repo.language}</p>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default RepoList
