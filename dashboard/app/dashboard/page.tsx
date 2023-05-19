"use client";
import React from 'react'
import { Octokit } from 'octokit'

import { useSession, signIn, signOut } from "next-auth/react";
import { stat } from 'fs';


const Page = () => {

    const { data: session, status } = useSession()

    if (status === "loading") {
        return <p>Loading...</p>;
    } else if (status === "unauthenticated") {
        return <p>Access Denied</p>;
    } else if (status === "authenticated") {
        return (
            <div>
                {JSON.stringify(session)}
            </div>
        )
    }

}

export default Page