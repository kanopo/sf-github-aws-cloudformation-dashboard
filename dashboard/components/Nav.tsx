"use client";

import Link from "next/link";
import Search from "./Search";


const Nav = () => {
  return (
    <div className="h-[8vh] flex items-center border-2" >
      <ul className="w-[50vw] flex justify-around items-center">
        <li><Link href="/">Home</Link></li>
      </ul>
      <Search />
    </div>

  )
}

export default Nav;
