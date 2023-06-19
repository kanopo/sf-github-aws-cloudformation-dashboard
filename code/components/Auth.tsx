"use client"

import { signIn, signOut } from 'next-auth/react'

export const Login = () => {
  return (
    <button onClick={() => signIn()}>Sign in</button>
  )
}


export const Logout = () => {
  return (
    <button onClick={() => signOut()}>Sign out</button>
  )
}
