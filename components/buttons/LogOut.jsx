"use client"
import { signOut } from "next-auth/react";
import { HiOutlineLogout } from "react-icons/hi";
import { PiSignOutLight } from "react-icons/pi";
function LogOut() {
  return (
   <button className=' flex items-center max-lg:gap-1 gap-3 border max-lg:px-1 max-lg:py-0 max-lg:text-sm px-3 rounded-full border-[#1E2330] py-2 font-medium' onClick={()=>signOut()}>
      <h1>Sign Out  </h1><HiOutlineLogout className=' text-xl ' /> 
         </button>
  )
}

export default LogOut