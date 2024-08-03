import HeroForm from "@/components/HeroForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session=await getServerSession(authOptions)
  return (
   <main className=" bg-zinc-90 bg-[#502274] min-h-screen relative max-lg:px-6 px-20">
     
    <div className=" pt-20">
      
      <div className=" max-lg:w-full w-1/2">
        <h1 className=" max-lg:text-[35px] text-[70px] font-bold leading-none">Everything you are. In one, simple link in bio.</h1>
        <p className=" max-lg:mt-6 text-sm max-lg:text-xs mt-3">Join 50M+ people using OneLink for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>

       <HeroForm user={session?.user}/>
      </div>
    </div>
   </main>
  );
}
