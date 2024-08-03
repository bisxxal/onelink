'use client' 
import {grabUserName} from '@/action/ClimeUsrname'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import {useFormStatus} from 'react-dom'
function UserName({username}) {
const [taken , setTaken] = useState(false)
const {pending} = useFormStatus()
    const handelSumbit = async(formData)=>{ 

      const res  =  await grabUserName(formData)
      console.log("REsponcr in username ",res);
      setTaken(res === false)
      if(res){
        redirect('/account?created='+formData.get('username'))
      }
    }
  return (
  <div className=' h-screen w-full flex justify-between '>
      <form action={handelSumbit} className=' w-2/3 max-lg:w-full flex flex-col bg-[#E9C0E9 rounded-lg items-center justify-center  ' >

     <div className=' mb-10 max-lg:px-3  '>
     <h1 className='max-lg:text-2xl text-4xl font-bold max-lg:text-center '>WElCOME TO ONELINK !!</h1>
     <p className=' text-sm mt-2 text-gray-500  max-lg:text-center '>Choose your Linktree username. You can always change it later.</p> 
     </div >
     <div className=' bg-[#E9C0E9] text-black rounded-xl pl-3 h-12 w-1/3 max-lg:w-[60%]  flex items-center  '> OneLink/  
      <input className= ' border-[1px] border-black outline-none  rounded-xl px-1 h-full text-black ' defaultValue={username} name='username' type="text" /></div>
        <button
        disabled={pending}
        className=' bg-blue-500 disabled:bg-blue-300 disabled:text-zinc-600 px-4 py-2 rounded-xl mt-10 max-lg:w-1/2 w-1/3  ' type="submit">clim your username</button>
    {
        taken &&(
            <div className=' bg-[#ff000072] border-[1px] border-red-500 px-2 w-1/3 max-lg:w-1/2 py-2 rounded-lg text-xs mt-2' >User name Already taken</div>  
        )
    }
    </form>

    <div className=' max-lg:hidden w-1/3 h-full'>
      <Image className=' w-full h-full object-cover object-center' src='/bg.png' height={500} width={500} alt='' />
    </div>
  </div>
  )
}

export default UserName