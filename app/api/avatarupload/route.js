
import {writeFile ,unlink} from 'fs/promises' 
import ConnectDb from '@/lib/connect' 
import { NextResponse } from 'next/server' 
import { UserModel } from '@/models/User'

ConnectDb()
export async function POST(request){
    try {
          const formData =await request.formData() 
      const avaterInput= formData.get('avater')
      const owner= formData.get('user')  
      console.log(owner , 'owner');
      const page = await UserModel.findOne({email:owner})
      if(!page){ 
         return NextResponse.json({success:false })
      }
      console.log(avaterInput , 'sdfdsc');
      
      if (page.avater) { 
         try {
            await unlink(`./public/${page.avater}`);
            console.log("Successfully unlinked previous image.");
         } catch (err) {
            console.error("Error while unlinking previous image:", err); 
         }
     }
      const imageByteData = await avaterInput.arrayBuffer();
      const buffer = Buffer.from(imageByteData);
  
     const newFileName = `${Date.now()}_${avaterInput.name}`;
     const path = `./public/${newFileName}`;
 
     await writeFile(path, buffer);
  
     await UserModel.updateOne({ email:owner }, { image: newFileName });
 
       return NextResponse.json({success:true })
    } catch (error) {
     
    }
 }
  