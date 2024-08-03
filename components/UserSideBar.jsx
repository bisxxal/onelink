"use client"
import Image from "next/image";
import Link from "next/link";
import LogOut from "@/components/buttons/LogOut";
import { IoAnalyticsSharp } from "react-icons/io5";
import { MdOutlineContactPage } from "react-icons/md";
import { TbArrowBackUp } from "react-icons/tb";
import { usePathname} from "next/navigation";
import { IoIosLink } from "react-icons/io";
function UserSideBar({ image ,name ,menu}) {
    const query = usePathname()
    
  return (
   
  <>
  <label htmlFor='navch' className=" fixed top-4 left-10  hidden  h-10 w-10 max-lg:flex justify-center items-center rounded-full text-2xl backdrop-blur  bg-[#64bdfc69] z-10 ">
    
     = 
     </label>
  <input type="checkbox" id="navch" className="hidden"/>
    <nav className="aside max-lg:hidden  hover:fixed z-20 shadow-lg shadow-[#ffffff45] w-52 max-lg:w-60 bg-[#98a8eb] fixed h-[96vh] rounded-[30px] p-5 flex flex-col justify-between items-center ">
    <div className=" w-full  ">
    <div className=" mx-auto w-full relative ">
    <label htmlFor='navch' className=" absolute -top-2 -right-1 hidden  h-10 w-10 max-lg:flex justify-center items-center rounded-full text-2xl bg-[#9706cc69] z-10 ">
    
    = 
    </label>
 <input type="checkbox" id="navch" className="hidden"/>
      <img className="mx-auto rounded-xl w-28 h-28 object-cover " src={ image} width={90} height={90} alt=''/>
    </div>

    <div className="flex flex-col mt-5 gap-4">
      <Link className=" flex  items-center justify-center gap-1" href={`/${name}`}>
      <IoIosLink className=" text-xl text-blue-700"/>
      / <span className=" text-blue-900  font-bold  capitalize ">{name}</span>
      </Link>
      <Link className={`${ query === '/account' ? ' text-pink-500 bg-indigo-900  ' : ' bg-indigo-500 '}     hover:bg-indigo-900 py-2 px-3 rounded-3xl flex items-center gap-3 font-medium`} href={'/account'}> <MdOutlineContactPage className=" text-lg" /> My Page</Link>
      <Link className={`${ query === '/analytics' ? ' text-pink-500 bg-indigo-900  ' : '  bg-indigo-500 '}  hover:bg-indigo-900 py-2 px-3 rounded-3xl flex items-center gap-3 font-medium`} href={'/analytics'}> <IoAnalyticsSharp className=" text-lg" /> Analytics</Link>
   
    <LogOut/>

    </div>
</div>
      <Link className="flex items-center gap-3 text-xs font-medium mt-7 hover:bg-indigo-900 px-2 py-2 border-[1px] rounded-2xl" href={'/'}> <TbArrowBackUp className=" text-lg" /> Back To Webside</Link>
</nav>
  </>
  )
}

export default UserSideBar