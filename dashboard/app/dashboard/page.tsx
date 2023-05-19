"use client";
import React from 'react'
import { Octokit } from 'octokit'

import { useSession, signIn, signOut } from "next-auth/react";


const Page = () => {

    const { data: session } = useSession()


    return (
        <div>
        </div>
    )
}

export default Page