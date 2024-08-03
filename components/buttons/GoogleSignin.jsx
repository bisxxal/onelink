'use client'
import {signIn} from 'next-auth/react'  
import { FaGoogle } from "react-icons/fa";
 
function GoogleSignin() {

  return (
    <div className=' rounded-full border border-[black] px-7 py-3 font-medium flex items-center gap-3'>
       <FaGoogle  className=' text-22xl'/>
      <button className=' text-sm' onClick={()=>signIn('google')} >Continue with Google</button>
    </div>
  )
}

export default GoogleSignin