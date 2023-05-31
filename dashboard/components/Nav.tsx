"use client";

import Link from "next/link";


const Nav = () => {
  return (
    <ul className="h-[8vh] w-[85vw] flex justify-start items-center">
      <li><Link href="/" className="p-4 mx-4">Home</Link></li>
      <li><Link href="/about" className="p-4 mx-4">About</Link></li>
    </ul>
  )
}

export default Nav;
