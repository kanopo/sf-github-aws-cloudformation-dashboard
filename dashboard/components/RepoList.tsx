'use client'


import Link from "next/link"
import { useEffect, useState } from "react"

import { GitHubRepo } from "@/types/Octokit"

import { useSession } from "next-auth/react"

const RepoList = () => {
  const { data: session, status } = useSession();
  console.log(session)


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
    const filtered = repos.filter(repo => repo.full_name.toLowerCase().includes(search.toLowerCase())
      ||
      repo.description !== null && repo.description !== undefined && repo.description.toLowerCase().includes(search.toLowerCase())
      ||
      repo.language !== null && repo.language !== undefined && repo.language.toLowerCase().includes(search.toLowerCase())
    )

    setFilteredRepos(filtered)
  }, [search])

  if (status === "authenticated") {
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
  else {
    return (
      <div>
        <p>Not logged in</p>
        <Link href="/api/auth/signin">Sign in</Link>
      </div>
    )
  }




}

export default RepoList
