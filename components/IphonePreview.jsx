import { IoIosLink } from "react-icons/io";
function IphonePreview({page ,image}) {
  return (
    <>
      <label htmlFor='prech' className=" fixed top-4 right-5  hidden  h-6 w-16 max-lg:flex justify-center items-center rounded-lg text-xs  backdrop-blur  bg-[#64bdfc69] z-10 ">
   preview
    </label>
 <input type="checkbox" id="prech" className="hidden"/>

    <div className=' ipn max-lg:hidden fixed right-3 w-[300px] bg-[#FBACF5] max-lg:h-[69vh] h-[96vh] rounded-3xl flex items-center text-black justify-center'>
    <h1 className=' absolute top-6 text-[#0000008e] text-lg font-bold left-1/3 flex gap-2 '>Your Links <IoIosLink className=" text-xl text-blue-500" /></h1>
     <div className=' iphonebg relative overflow-hidden border-[#000000b0] border-[7px] rounded-[50px] w-[87%] max-lg:h-[80%] h-[75%]  flex flex-col items-center'>

         <div className=' absolute left-1/3 top-3 rounded-full w-20 h-5 bg-black'></div>

         <div className='flex items-center text-[#000000b5] justify-center text-base  absolute bottom-2 backdrop-blur bg-[#0000003a] font-semibold h-8 rounded-full left-[28%]  w-[90px] '>
          <h1> One Link </h1>
           </div>
             <div className=' pt-14 w-full '>
             <img className=' mx-auto rounded-xl h-16 w-16 object-cover object-center shadow shadow-black/20 ' src={image} height={100} width={100} alt=''/>
             <h1 className=' text-center capitalize mt-2 font-bold'>{page.uri}</h1>

             <div className=' overflow-y-auto h-[60%] pb-16 iphone '>
                
                 {
                     page.links.map((item , index)=>{
                     
                       return(
                         <div
                         href={item.url} key={index} className='  mx-auto bg-gray-300 w-[86%] rounded-xl h-10 mt-3  px-2  shadow-lg hover:shadow-xl  hover:scale-[1.02] transition-all flex items-center gap-7'>
                     
                         <div className=" h-full w-10 rounded-md flex items-center overflow-hidden justify-center ">
                         { item?.icon? <img src={item?.icon} className=" w-full h-full object-cover" alt="" />: <IoIosLink className=" text-xl text-blue-500" />}
                         </div>
                     <div>
                     <h1 className=' font-semibold text-sm capitalize text-center'>{item.title}</h1>

                     </div>
                     
                     </div>
                     )
                     })
                 } 

             </div>
          </div>
           
     </div>
 </div>
    </>
  )
}

export default IphonePreview