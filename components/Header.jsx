import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { IoIosLink } from "react-icons/io";
import LogOut from './buttons/LogOut';
 async function  Header() {
  const session  = await getServerSession(authOptions) 
  return (
    <div className=' z-50 fixed top-5 bg-[#E9C0E9] shadow-lg w-[95vw] left-3 rounded-2xl text-black max-lg:px-3 px-10 items-center h-[60px] flex justify-between'>
        <div>
           <Link href={'/'} className=' max-lg:text-lg text-3xl font-bold text-zinc-700 flex items-center gap-1'>OneLink <span><IoIosLink className=' text-2xl text-[#0081fa]' /></span></Link>
        </div> 
        <div className=' flex max-lg:gap-1  gap-5'>
          {
           session && session ? <>
            <Link href={'/account'} className=' flex items-center capitalize max-lg:gap-2 gap-5 max-lg:text-xs text-lg font-medium '>
       <h1 className=' max-lg:hidden'>hii, {session?.user?.name}</h1>
                <img className=" rounded-full " src={session?.user?.image} width={40} height={40} alt='User Logo'/>
            </Link>

            <LogOut/>
            </> :<>
            <Link href={'/signin'} className='text-sm bg-gray-300 font-medium px-5 py-2 rounded-lg'>Login</Link>
            <Link href={'/signin'} className='text-sm bg-[#1E2330] px-5 py-2 rounded-full text-white'>Sign up free</Link>
            
            </>
          }
        </div>
    </div>
  )
}

export default Header