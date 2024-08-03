
import GoogleSignin from '@/components/buttons/GoogleSignin' 

function SignIn() {
  return (
    <div className=' w-full flex h-screen  items-center justify-center bg-white '>
     <div className=' flex flex-col items-center rounded-2xl h-[300px]  gap-3 w-[50%] max-lg:w-full mx-auto bg-white text-black'>
       <h1 className=' text-4xl font-semibold'>Welcome to OneLink  !
     </h1>
       <h1 className='text-xs text-zinc-800'> Log in to your OneLink. </h1>
        <div>
           <GoogleSignin/>
        </div>
     </div>

     <div className=' w-1/2 max-lg:hidden  bg-[#2a0d58] h-full flex items-center justify-center'> 
      <img src="/sign.svg" alt="" />
     </div>
    </div>
  )
}

export default SignIn