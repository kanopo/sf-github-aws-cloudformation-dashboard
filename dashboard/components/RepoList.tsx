'use client'


import Link from "next/link"
import { useEffect, useState } from "react"

const RepoList = () => {

    const [repos, setRepos] = useState([])

    useEffect(() => {
        fetch('/api/repos', {
            cache: 'no-cache',
        })
            .then(res => res.json())
            .then(data => setRepos(data))

    }, [])

    return (
        <div className="w-[50vw]">
            <h1>My repos</h1>
            {repos && repos.map((repo: any) => (
                <Link href={'/repos/' + repo.id}>

                    <div id={repo.id} className="border-2 p-2 m-2">
                        <p>{repo.name}</p>
                        <p>{repo.language}</p>
                        <p>{repo.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default RepoList