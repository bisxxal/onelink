import HeroForm from "@/components/HeroForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { IoIosLink } from "react-icons/io";
export default async function Home() {
  const session=await getServerSession(authOptions)
  return (
   <main className=" bg-zinc-90 bg-[#502274] min-h-screen pb-40 relative max-lg:px-6 pr-10 px-20">
     
    <div className=" pt-20 flex max-lg:flex-col justify-between">
      
      <div className=" max-lg:w-full w-1/2">
        <h1 className=" max-lg:text-[35px] text-[70px] font-bold leading-none">Everything you are. In one, simple link in bio.</h1>
        <p className=" max-lg:mt-6 text-sm max-lg:text-xs mt-3">Join 50M+ people using OneLink for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>

       <HeroForm user={session?.user}/>
      </div>

      <div className=" w-1/2  max-lg:w-full max-lg:mt-20">
          <img className=" mx-auto w-[] h-[80%] " src="/mainbg.svg" alt="" />
      </div>
    </div>

    <div className=" w-full mt-20 flex max-lg:text-[60px] max-sm:text-[40px] max-lg:rounded-3xl max-lg:gap-0 max-lg:leading-none text-[220px] py-7 bg-[#e9c0e9] rounded-[40px] justify-center gap-8 items-center">
      <h1 className=" text-center font-bold ">ONE LINK
      </h1>
         <IoIosLink className="text-blue-500" />
    </div>
   </main>
  );
}
