'use client'
import {savePageSetting} from '@/action/PageActions'
import axios from 'axios'
import Image from 'next/image' 
import { useState } from 'react'
import toast from 'react-hot-toast' 
import { MdCloudUpload } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
 function UserSettingPage({image ,page ,user}) {
    const [bgType ,setBgType] = useState(page.bgType)
    const [bgColor,setBgcolor] = useState(page.bgColor)
    const [bgImage,setBgImage] = useState(page.bgImage)
    const [avater,setAvater] = useState(page.avater)
    const [image2 ,setImage] = useState(false)
    const [avaterload ,setAvaterload] = useState(false)
   
   const sumbitHandeler = async(formData)=>{
        
   const Uplodingpromise = new Promise( async(resolve , reject)=>{
    if(image2 ){
             
        formData.set('image2', image2) 
        formData.set('user', user)
        const responce = await axios.post('/api/upload',formData)
        if(responce){
        setImage(false) 
        setBgImage(page.bgImage)
        setBgType('bgImage') 
        resolve()
        }
        else{
            reject()
        }
    }
    if(avaterload){ 
        formData.set('avater', avater)
        formData.set('user', user)
        const responce = await axios.post('/api/avatarupload',formData)
        if(responce){ 
        setAvater (false) 
        setAvater(page.avater)
       
        resolve()
        }
        else{
            reject()
        }
    }
        const res = await savePageSetting(formData)
        if(res){
            resolve()
        }
        else{
            reject()
        }
      
   })

   await toast.promise(Uplodingpromise , {
    loading:'Uploading...',
    success:'Updated SucessFully',
    error:'Error Uploading'
   })
    
    }
    
 return (
    <div className=' w-full flex gap-3'> 

        <form action={sumbitHandeler} className=' bg-[#191b24] rounded-lg w-full '>
        <div
        className={` h-72 rounded-lg flex justify-center items-center text-black bg-no-repeat bg-cover bg-center `}
        style={bgType === 'color' ? { backgroundColor: bgColor } : {backgroundImage:`url(${bgImage})`}  }>
           <div>
                <div className="radioToggle rounded-lg overflow-hidden">

                <label>
                <input onClick={e=>setBgType(e.target.value)} defaultChecked={bgType} type="radio" name="bgType" value="color" />
                <span>Color</span>
                </label>
                <label>
                <input onClick={e=>setBgType(e.target.value)}  type="radio" name="bgType" value="Image" />
                <span>Image</span>
                </label>
                </div>

               { bgType === 'color' ? <div className=' flex flex-col items-center mt-3'> <label className='   text-gray-300 border-gray-300 border rounded-lg   px-3 py-2  text-xs'> Change Background Color</label> 
               <br/>
                <input onChange={e=>setBgcolor(e.target.value)} type="color" name="bgColor"/> </div>:''}

               { bgType !== 'color' ? <div className=' flex items-center  mt-3'>
                <label className='backdrop-blur-sm text-gray-300 border-gray-300 border rounded-lg px-3 py-2 text-sm'> 
                <input hidden onChange={(e)=>setImage(e.target.files[0])} type="file" name="image2"/>
                 <span className=' flex items-center gap-3'>Upload Image <MdCloudUpload className=' text-xl' /></span> 
                </label>
                 </div>:''
                }
            </div>

           </div>
            <div >
            <div className=' flex items-center justify-center relative '>
                <img className=' rounded-full relative -top-10 border-[4px] h-32 w-32 object-cover object-center shadow shadow-black/20 border-zinc-200 ' src={image} height={100} width={100} alt=''/>
                <label className='bottom-[-5] ml-20 rounded-full flex justify-center items-center border-[2px] border-zinc-200 h-10 w-10 text-2xl text-black bg-white text- absolute'>
                     <MdCloudUpload className=' text-zinc-600' />
                    <input onChange={(e)=>{setAvater(e.target.files[0]) ; setAvaterload(true)}} type="file" name="avater" hidden id="" />                
                </label>
            </div>

            <div className=' p-4 flex flex-col '>
                <label   htmlFor="nameIn">DisplayName</label>
                <input className=' mt-2 bg-[#16161e] px-3 py-1 rounded-lg' defaultValue={page.displayName} name='displayName' id='nameIn' placeholder='Your name' type="text" />
                <label className=' mt-4' htmlFor="locationIn">Location</label>
                <input  className=' mt-2 bg-[#16161e] px-3 py-1 rounded-lg' defaultValue={page.location} name='location' id='locationIn' placeholder='SomeWere in the world' type="text"  />
                <label className=' mt-4' htmlFor="bioIn">Bio</label>
                <textarea  className=' mt-2 bg-[#16161e] px-3 py-1 rounded-lg' defaultValue={page.bio} name='bio' placeholder='Write Your Bio' id="bioIn"></textarea>
                <button className='mx-auto mt-4 w-24 rounded-xl flex text-white items-center gap-2 font-medium  bg-blue-600 px-4 py-2' type='sumbit'>Save <FaRegSave /> </button>
            </div>
            </div>
        </form> 
    </div>
  )
}

export default UserSettingPage