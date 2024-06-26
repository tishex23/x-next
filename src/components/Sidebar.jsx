import { FaXTwitter } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import Link from "next/link";



export default function Sidebar() {
  return (
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
        <button className="bg-blue-400 w-48 h-9 text-white
        hidden xl:inline  rounded-full hover:brightness-95
        transition-all duration-200 ">
          Sign in
        </button>
    </div>
  )
}
