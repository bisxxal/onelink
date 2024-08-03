"use client"
import Link from 'next/link';
import toast from "react-hot-toast";
import { IoIosLink } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { FaDiscord } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa"; 

 
function PublicLinks({page}) {

  const buttonsIcons ={
    gmail: CiMail,
    discord: FaDiscord,
    instagram: FaInstagram,
    facebook: FaFacebook,
    whatsapp: FaWhatsapp,
    phone: FaPhoneAlt,
    github: FaGithub,
    youtube: FaYoutube,
  };

   function buttonLink(key, value) {
  switch (key) {
    case 'phone':
      return `tel:${value}`;
    case 'gmail':
      return `mailto:${value}`; 
    default:
      return  `https://${value}`;
  }
}

      
    const handleCopy = (url) => { 
        navigator.clipboard.writeText(url).then(() => {
          toast.success('URL copied to clipboard:');
        }).catch(err => {
          console.error('Failed to copy:', err);
        });
      };
     
    
  return (
    <>
    <div className=" w-full flex justify-center items-center gap-4 mt-5 ">
    { page?.buttons && Object.keys(page?.buttons).map(buttonKey => {
          const IconComponent = buttonsIcons[buttonKey]; 
        return ( <Link key={buttonKey} href={buttonLink(buttonKey, page.buttons[buttonKey])}
                className="rounded-full h-14 w-14  border-white border text-blue-950 backdrop-blur bg-[#85858523]  p-2 flex items-center justify-center shadow-lg hover:scale-[1.02] " >
                 <IconComponent className="text-xl text-white" />
          </Link>)
        })}
     
    </div>
    <div className='w-full mt-10 flex flex-col items-center gap-3 '>
      
      {
       page?.links && page.links.map((item , index)=>{
        
          return(
            <Link
            key={index}
            target='_blank'
            ping={process.env.URL+'api/click?url='+ btoa(item.url)+'&page='+page.uri}
            href={item.url} className=' max-lg:w-[350px] w-[600px] rounded-xl px-2 py-2 shadow-lg hover:shadow-xl backdrop-blur bg-[#0b081023] hover:scale-[1.02] transition-all flex items-center gap-2 justify-between'>
          
            <div className=" bg-[#16161e] w-14 rounded-md flex items-center overflow-hidden justify-center h-14">
            { item?.icon? <img src={item?.icon} className=" w-full h-full object-cover" alt="" />: <IoIosLink className=" text-xl text-blue-500" />} 
            </div>
           <div>
           <h1 className='text-xl max-lg:text-[17px] fontbold text-center capitalize'>{item.title}</h1>
            <p className='text-center text-xs capitalize'>{item.subtitle}</p>           

           </div>
           <div onClick={()=>handleCopy(item.url)} className=' h-10 w-10 bg-[#B7A2C9] hover:bg-[#322F42] flex items-center justify-center rounded-xl font-medium'>
            <p hidden>{item.url}</p>
           <MdContentCopy className=' text-lg'/>
           </div>
          </Link>
          )
        })
      }
        
     
    </div>
    </>
  )
}

export default PublicLinks