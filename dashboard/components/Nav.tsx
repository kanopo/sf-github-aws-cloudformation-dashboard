"use client";

import Link from "next/link";
import LoginButton from "./LoginButton";


const Nav = () => {
  return (
    <div className="h-[8vh] flex items-center border-2" >
      <ul className="w-[50vw] flex justify-around items-center">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/dashboard">Dashboard</Link></li>
      </ul>
      <LoginButton />
    </div>

  )
}

export default Nav;
