"use client";

import Link from "next/link";
import LoginButton from "./LoginButton";


const Nav = () => {
  return (
    <div>
      <ul>
        <li><Link href="/">Home</Link></li>
      </ul>
      <LoginButton />
    </div>

  )
}

export default Nav;
