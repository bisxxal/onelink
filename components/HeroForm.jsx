"use client"
import { signIn } from "next-auth/react"
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react"

function HeroForm({user}) {
const router  = useRouter()
  useEffect(()=>{
    if( 'localStorage' in window && window.localStorage.getItem('usename')){
      const username = window.localStorage.getItem('usename');
      window.localStorage.removeItem('usename')
      redirect('/account?username='+username)
    }
  } , [])
    const handelSumbit = async (e)=>{
        e.preventDefault( )
        const input = e.target.querySelector('input')
        const userName = input.value

        if(userName.length > 0){
          if(user){
            router.push('/account?username='+userName)
          }
          else{
              window.localStorage.setItem("usename" , userName)
              await signIn('google')
            }
        }
    }
  return (
    <form onSubmit={handelSumbit} className=" flex max-lg:flex-col max-lg:gap-5  mt-5 rounded-md w-fit overflow-hidden" >
        <div className=" text-zinc-500 bg-white h-14 px-4  max-lg:w-[90%] items-center overflow-hidden  max-lg:flex max-lg:rounded-md "> 
          <span>One.Link/</span>
        <input className=" pr-2 h-full border-none outline-none  " type="text" placeholder="UserName" />
        </div>
        <button type='sumbit' className="max-lg:rounded-md bg-blue-500 max-lg:w-[90%] max-lg:h-14 px-3 ">Get For free</button>
    </form>
  )
}

export default HeroForm