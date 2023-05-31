'use client'


import Link from "next/link"
import { useEffect, useState } from "react"

import { GitHubRepo } from "@/types/Octokit"

const RepoList = () => {

  const [repos, setRepos] = useState([])

  useEffect(() => {
    fetch('/api/repos', {
      cache: 'no-store',
    })
      .then(res => res.json())
      .then(data => setRepos(data))

  }, [])

  return (
    <div className="w-[50vw]">
      <h1>My repos</h1>
      {repos && repos.map((repo: GitHubRepo) => (
        <div key={repo.id}>
          <Link href={`/repos/${repo.full_name}`}>
            <p>{repo.full_name}</p>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default RepoList
