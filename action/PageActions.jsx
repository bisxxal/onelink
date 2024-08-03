'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ConnectDb from "@/lib/connect"
import { PageModel } from "@/models/Page";
import { getServerSession } from "next-auth"; 
export async function savePageSetting(formData) {
  try {
        ConnectDb(); 
    const session = await getServerSession(authOptions);
    const displayName = formData.get('displayName')
    const location = formData.get('location')
    const bio = formData.get('bio')
    const bgType = formData.get('bgType')
    const bgColor = formData.get('bgColor') 
    if(session){ 
     await PageModel.updateOne({owner:session?.user?.email},{displayName , location ,bio, bgType , bgColor 
 
    }) 
    }
    return true
  } catch (error) {
    console.log("Error in PageACtion " , error);
  }
}

export async function saveButtons(formData) {
  try {
        ConnectDb();
    const session = await getServerSession(authOptions);   
    if(session){ 
      const buttonValue = {};
      formData.forEach((value,key) => {
        buttonValue[key]= value
      }); 
      const dataToUpdate = {buttons:buttonValue}
      //console.log(dataToUpdate);
      await PageModel.updateOne({owner:session?.user?.email} , dataToUpdate);
    
        return true;
      }
      return false;
  } catch (error) {
    console.log("Error in PageACtion " , error);
  }
}

export default savePageSetting