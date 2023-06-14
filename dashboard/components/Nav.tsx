"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Login, Logout } from "./Auth";


const Nav = () => {
  const { data: session, status } = useSession();

  return (
    <div className="h-[8vh] w-[85vw] flex justify-start items-center">
      <ul className="h-[8vh] w-[85vw] flex justify-start items-center">
        <li><Link href="/" className="p-4 mx-4">Home</Link></li>
        <li><Link href="/about" className="p-4 mx-4">About</Link></li>
      </ul>
      {status === "authenticated" ? <Logout /> : <Login />}
    </div>
  )
}

export default Nav;
