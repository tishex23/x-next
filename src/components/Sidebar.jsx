"use client"

import { FaXTwitter } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { HiDotsHorizontal } from "react-icons/hi";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";




export default function Sidebar() {

const { data: session } = useSession();
console.log(session);



  return (
    <div className="flex flex-col p-3 justify-between h-screen">
      <div className="flex flex-col gap-4">
        <Link href="/">
          <FaXTwitter className="w-16 h-16
           hover:bg-gray-100 cursor-pointer 
           rounded-full transition-all duration-200" />
        </Link>
        <Link href="/"  className="flex items-center gap-2 p-3
        hover:bg-gray-100 rounded-full transition-all duration-200 w-fit">
          <AiFillHome className="w-8 h-8" />
          <span className="font-bold hidden xl:inline">Home</span>
        </Link>

        {session ? (
          <button className="bg-blue-400 w-48 h-9 text-white
        hidden xl:inline  rounded-full hover:brightness-95
        transition-all duration-200" onClick={() => signOut()}>
            Sign Out
          </button>
        ): (
          <button className="bg-blue-400 w-48 h-9 text-white
        hidden xl:inline  rounded-full hover:brightness-95
        transition-all duration-200" onClick={() => signIn()}>
            Sign in
          </button>
        )}
        
        </div>

        {
          session && (
            <div className="text-gray-700 text-sm flex items-center cursor-pointer p-3 hover:bg-slate-100 rounded-full transition-all duration-200">
              <img src={session.user.image} alt="profile" 
              className="w-10 h-10 rounded-full xl:mr-2" />
              <div className="hidden xl:inline">
                <h4 className="font-bold">{session.user.name}</h4>
                <p className="text-gray-500">@{session.user.username}</p>
              </div>
              <HiDotsHorizontal className="hidden xl:inline xl:ml-8 h-5" />
            </div>
          )
        }

    </div>
  )
}
