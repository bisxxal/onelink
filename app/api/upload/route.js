import {writeFile ,unlink} from 'fs/promises' 
import ConnectDb from '@/lib/connect'
import { PageModel } from '@/models/Page'
import { NextResponse } from 'next/server' 

ConnectDb()
export async function POST(request){
 
   try {
         const formData =await request.formData() 
     const image= formData.get('image2')
     const owner= formData.get('user')  
     
     const page = await PageModel.findOne({owner})
     if(!page){
        return NextResponse.json({success:false })
     }
     
     
    if(image){
      if (page.bgImage) { 
         try {
            await unlink(`./public/${page.bgImage}`);
            console.log("Successfully unlinked previous image.");
         } catch (err) {
            console.error("Error while unlinking previous image:", err); 
         }
     }
      const imageByteData = await image.arrayBuffer();
      const buffer = Buffer.from(imageByteData);
  
     const newFileName = `${Date.now()}_${image.name}`;
     const path = `./public/${newFileName}`;
 
     await writeFile(path, buffer);
  
     
     await PageModel.updateOne(
      { owner },
      { $set: { seTypes: "bgColor", bgImage: newFileName } }
    );
    
 
       return NextResponse.json({success:true })
    }
 
    return NextResponse.json({success:false })

   } catch (error) {
    
   }
}  