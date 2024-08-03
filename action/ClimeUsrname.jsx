"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ConnectDb from "@/lib/connect";
import { PageModel } from "@/models/Page"; 
import { getServerSession } from "next-auth";

ConnectDb()
export async function grabUserName(formData) {
   const username = formData.get('username')
   try {

    const existingPage = await PageModel.findOne({uri:username});

    if(existingPage){ 
       return  false
    }
    else{
        const session=await getServerSession(authOptions)
        const page = await PageModel.create({uri:username , owner:session?.user?.email})
    //    return  page
    return true
    }
   } catch (error) {
    console.log(error); 
   }
}

export default grabUserName