'use client'


import Link from "next/link"
import { useEffect, useState } from "react"

import { GitHubRepo } from "@/types/Octokit"

const RepoList = () => {

  const [repos, setRepos] = useState<GitHubRepo[]>()
  const [user, setUser] = useState("")

  const [search, setSearch] = useState("")

  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>()

  useEffect(() => {
    fetch('/api/repos', {
      cache: 'no-store',
    })
      .then(res => res.json())
      .then((data: GitHubRepo[]): void => {
        setRepos(data)
        setFilteredRepos(data)
        // const login = data[0].owner.login
        // setUser(login)
        // console.log(data)
      })

  }, [])


  useEffect(() => {
    if (!repos) return
    const filtered = repos.filter(repo => repo.full_name.includes(search))
    setFilteredRepos(filtered)
  }, [search])


  if (!repos) return <div>Loading...</div>


  return (
    <div className="w-[80vw]">
      {user && <h1>Repos for {user}</h1>}

      <input type="text" className="w-full border-2 border-dashed p-4 my-2" placeholder="Search" value={search} onChange={(event) => { setSearch(event.target.value) }} />


      {filteredRepos && filteredRepos.map((repo: GitHubRepo) => (
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
