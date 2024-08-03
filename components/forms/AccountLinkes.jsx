"use client";
import { useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { FaGripLines } from "react-icons/fa6";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";
function AccountLinkes({page , user}) {
  const [link, setLinks] = useState(page.links||[]);
  // const [images ,setImages] = useState('')
  const [images, setImages] = useState([]);

const addNewLinks = () => {
    setLinks(prev => [...prev, { key:Date.now().toString(), title:'' , subtitle:'' ,icon:'', url:''}]);
  }

 

const save = async () => {
  const formData = new FormData();

  formData.append('user', user);
  formData.append('link', JSON.stringify(link));

  if (Array.isArray(images)) {
    images.forEach(({ key, file }) => {
      formData.append(`icon_${key}`, file);
      console.log(`icon_${key}`, file);
    });
  } else {
    console.error('Expected images to be an array, but it is not:', images);
  }

  try {
    const response = await axios.post('/api/linkupload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(response.data);
    toast.success('Links added successfully');
  } catch (error) {
    console.error('Error saving links:', error);
    toast.error('An error occurred while saving the links');
  }
};


const handleUpload = (e, linkKeyForUpload) => {
  const { name, files } = e.target;

  if (files && files.length > 0) {
    const file = files[0];
    setLinks(prev =>
      prev.map(lnk =>
        lnk.key === linkKeyForUpload ? { ...lnk, [name]: file } : lnk
      )
    );
    setImages(prev => {
      const existingImageIndex = prev.findIndex(image => image.key === linkKeyForUpload);
      if (existingImageIndex !== -1) {
        // Replace the existing file
        const newImages = [...prev];
        newImages[existingImageIndex] = { key: linkKeyForUpload, file };
        return newImages;
      } else {
        // Add new file
        return [...prev, { key: linkKeyForUpload, file }];
      }
    });
  } else { 
    const { value } = e.target;
    setLinks(prev =>
      prev.map(lnk =>
        lnk.key === linkKeyForUpload ? { ...lnk, [name]: value } : lnk
      )
    );
  }
};
const handleFileChange = (e, linkKeyForUpload) => {
  const { files } = e.target;

  if (files && files.length > 0) {
    const file = files[0];

    // Update the links state with the file
    setLinks(prev =>
      prev.map(link =>
        link.key === linkKeyForUpload ? { ...link, icon: file } : link
      )
    );

    // Update the images state
    setImages(prev => {
      const existingImageIndex = prev.findIndex(image => image.key === linkKeyForUpload);
      if (existingImageIndex !== -1) {
        // Replace the existing file
        const newImages = [...prev];
        newImages[existingImageIndex] = { key: linkKeyForUpload, file };
        return newImages;
      } else {
        // Add new file
        return [...prev, { key: linkKeyForUpload, file }];
      }
    });
  }
};
const removeLink = (remlink)=>{
  const newLinks = link.filter(l=> l.key !== remlink);
  setLinks(newLinks);
}
 
  return (
    <div className=' mt-4 bg-[#191b24] p-2 rounded-xl'>
        <h1>Add Links</h1>
      <form action={save}>
        <div className="bg-[#16161e] items-center rounded-md mt-2 p-2 flex  ">

          <div onClick={addNewLinks} className="py-1 px-3 cursor-pointer rounded-lg mr-2 text-lg bg-blue-600"> + </div>
            Add New Links
          </div>

          <div>
            <ReactSortable list={link} setList={setLinks} handle=".myhandel">
            {

              link.map((item , index)=>{
                return(
                  <div  key={index} className=" flex items-center relative gap-5 my-3 rounded-xl max-lg:my-2 bg-[#0b0b1082]  max-md:flex-col-reverse ">
                    <div className=" max-lg:absolute top-1/2 left-3 ml-3"> <FaGripLines className="myhandel"/> </div>
                    <div onClick={()=>removeLink(item.key)} className=" hidden cursor-pointer bg-[#16161E] px-3 py-4 rounded-lg max-lg:flex gap-3 items-center text-sm">
                      remove links    <MdDeleteOutline className='text-red-600 text-lg' />
                    </div>
                  <div className=" flex flex-col items-center">
                        <div className=" bg-[#16161e] w-14 rounded-md flex items-center overflow-hidden justify-center h-14">
                        { item?.icon? <img src={item?.icon} className=" w-full h-full object-cover" alt="" />: <IoIosLink className=" text-xl text-blue-500" />}
                          
                          </div>
                        
                        <input onChange={(e) => handleFileChange(e, item.key)} id={'icon'+item.key} hidden type="file" />
                        <label htmlFor={'icon'+item.key} className="mt-2 text-xs flex  items-center border-[1px] border-zinc-500 p-2 py-1 rounded gap-2">Change Icon <IoCloudUploadOutline className=" text-blue-500 text-lg" />
                        </label>

                    </div>   
                    <div className="flex grow flex-col gap-2 my-4 text-sm ">
                      <h1 className=" text-xs  mt-2">Add Title - </h1>
                      <input required onChange={(e)=>handleUpload(e , item.key)} defaultValue={item.title} value={link.title} name="title" className="p-1 px-2 rounded bg-[#242431]" type="text" placeholder="title" />
                      <h1 className=" text-xs mt-2 ">Add SubTitle - </h1>
                      <input onChange={(e)=>handleUpload(e , item.key)} defaultValue={item.subtitle} value={link.subtitle} name="subtitle" className="p-1 px-2 rounded bg-[#242431]" type="text" placeholder="Subtitle(optional)" />
                      <h1 className=" text-xs  mt-2">Add URL - </h1>
                      <input required onChange={(e)=>handleUpload(e , item.key)} defaultValue={item.url} value={link.url} name="url" className="p-1 px-2 rounded bg-[#242431]" type="text" placeholder="url" />
                   
                   
                    </div>

                    <div onClick={()=>removeLink(item.key)} className=" max-lg:hidden cursor-pointer bg-[#16161E] px-3 py-4 rounded-lg flex gap-3 items-center text-sm">
                      remove links    <MdDeleteOutline className='text-red-600 text-lg' />
                    </div>
                  </div>
                )
              })
                    
            }
              </ReactSortable>
          </div>

          <div className="border-zinc-500 pt-2 border-t-[1px] mt-3 ">
                  <button className='  mx-auto mt-4 w-24 rounded-xl flex text-white items-center gap-2 font-medium  bg-blue-600 px-4 py-2' type='sumbit'>Save <FaRegSave /> </button>
          </div>
      </form>

    </div>
  )
}

export default AccountLinkes