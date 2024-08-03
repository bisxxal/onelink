'use client'
import React, { useState } from 'react'
import { CiMail } from "react-icons/ci";
import { FaDiscord } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import {saveButtons} from '@/action/PageActions'
import { MdDeleteOutline } from "react-icons/md";
import { FaGripLines } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { ReactSortable } from 'react-sortablejs';

function AccountPageButton({page , user}) {
    const allButtons =[
    { name : 'gmail' ,icon: <CiMail/> , placeholder:'xyz@gmail.com'},
    { name : 'discord' ,icon: <FaDiscord/> , placeholder:''},
    { name : 'instagram' ,icon: <FaInstagram/> , placeholder:'abc.instagrm.com'},
    { name : 'facebook' ,icon: <FaFacebook/> , placeholder:''},
    { name : 'whatsapp' ,icon: <FaWhatsapp/> , placeholder:'+91 3453443342'},
    { name : 'phone' ,icon: <FaPhoneAlt/> , placeholder:'+91 3453443342'},
    { name : 'github' ,icon: <FaGithub/> , placeholder:'@xyz.github.com'},
    { name : 'youtube' ,icon: <FaYoutube/> , placeholder:''}
    ]
    let savedButtonInfo = []
    if(page.buttons){
        const savedButtonKeys = Object.keys(page?.buttons);
      savedButtonInfo = savedButtonKeys.map(item=> allButtons.find(b=> b. name === item));
}
    const [activeButtons, setActiveButtons] = useState(savedButtonInfo || []);
    
    const addButtonToProfile = (item) => {
        setActiveButtons(prevBtns => [...prevBtns, item]);
    }
    const removeButton = (key)=>{
        const newButtons = activeButtons.filter(b=> b.name !== key.name);
        setActiveButtons(newButtons);
    }

    const availableButtons = allButtons.filter(b1 => !activeButtons.find(b2 => b1.name === b2.name));

    const btnSumbit= async(formData)=>{ 
    const res = await saveButtons(formData)
    if(res){
        toast.success("setting saved ")
    }
  }
 
    return (
        <div className='px-2 py-2 mt-4 rounded-xl bg-[#191b24]'>
           <form action={btnSumbit}>
           <div className=' mb-2 flex flex-col gap-3  border-b-[1px] border-zinc-600 pb-5'>
            <ReactSortable list={activeButtons} setList={setActiveButtons}  handle=".myhandel" >
                 { activeButtons && activeButtons.map((b, index) => (
                    <div key={index} className='px-4 text-sm rounded-lg mb-3 py-1 flex items-center gap-7 bg-[#16161e]'>
                        <FaGripLines className=' myhandel' />

                         <h1 className='text-lg items-center gap-3 w-44 flex'>{b.icon} <span className=' capitalize'>{b.name}</span></h1>
                        <input required className='w-full px-2 py-2 h-full bg-[#242431] rounded-sm' name={b?.name} defaultValue={page?.buttons[b?.name]  || ''} placeholder={b?.placeholder} type="text" /> 
                       <div onClick={()=>removeButton(b)} className=' bg-red-600 p-3 rounded-lg'>
                        <MdDeleteOutline className=' text-lg' />
                       </div>

                    </div>
                ))}
                </ReactSortable>
            </div>

            <div className=' max-lg:overflow-x-auto flex-wrap flex gap-3 items-center border-b-[1px] border-zinc-600 py-2' >
            {availableButtons.map((item, index) => (
                 <button 
                    key={index} 
                    onClick={() => addButtonToProfile(item)} 
                    className='flex  items-center gap-2 p-2 rounded-lg bg-[#16161e] text-white'
                >
                    <h1 className='text-lg'>{item.icon}</h1>
                    <span className=' capitalize'>{item.name}</span>
                    <h1 className='text-lg rounded-full bg-[#ffffff42] hover:bg-[#ffffff20] px-2'>+</h1>
                </button>
            ))}
            </div>
            <button className='mx-auto mt-4 w-24 rounded-xl flex text-white items-center gap-2 font-medium  bg-blue-600 px-4 py-2' type='sumbit'>Save <FaRegSave /> </button>
         
           </form>
        </div>
    );
}
export default AccountPageButton