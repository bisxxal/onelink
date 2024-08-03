import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Chat from "@/components/Chat";
import UserSideBar from "@/components/UserSideBar";
import ConnectDb from "@/lib/connect";
import { Event } from "@/models/Event";
import { PageModel } from "@/models/Page";
import { isToday } from "date-fns";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { IoIosLink } from "react-icons/io";
async function page() { 
  const session=await getServerSession(authOptions)
  if(!session){
    redirect('/')
  } 
  ConnectDb()
  let page = await PageModel.findOne({ owner: session?.user?.email }).lean();
  if (page) {
    page = JSON.parse(JSON.stringify(page)); 
}
const groupedCount = await Event.aggregate([
  {
    $match: {
      type: 'view',
      uri: page.uri
    }
  },
  {
    $group: {
      _id: {
        $dateToString: {
          format: "%Y-%m-%d",
          date: "$createdAt"
        }
      },
      count:{
        "$count":{},
      }
    }
  },
  {
    $sort: {_id: 1}
  }
]);

const clicks = await Event.find({
  page: page.uri,
  type: 'click',
});


 if(page.links) {
  return (
    <>
     <UserSideBar name={page.uri} image={session?.user?.image}/> 
    <div className="ml-56  max-lg:mx-0  p-4 ">
      
     { page.links && <Chat data={ groupedCount.map(o=> ({'date':o._id, 'views':o.count}))    
      }/>}


      <div className="bg-[#191B24] rounded-3xl mt-10 ">
         <h1 className=" text-center pt-3">Clicks</h1>

       <div className=" w-full">
       {
           page.links && page.links.map((item , index)=>{
            
              return(    
              <div key={index} className=" px-5 max-lg:px-2 py-3 flex max-lg:flex-col justify-between max-lg:gap-2 gap-6 items-center mb-2 max-lg:rounded-xl max-lg:bg-[#1d1d34]">
              <div className="w-full flex flex-col gap-3 max-lg:overflow-hidden "> 
                  <div  className='rounded-xl px-2 py-2 shadow-lg hover:shadow-xl bg-[#16161E] hover:scale-[1.02] transition-all flex items-center gap-5'>
                      <div className=" bg-[#16161e] w-12 rounded-md flex items-center overflow-hidden justify-center h-12">
                      { item?.icon? <img src={item?.icon} className=" w-full h-full object-cover" alt="" />: <IoIosLink className=" text-xl text-blue-500" />} 
                      </div>
                          <div>
                          <h1 className=' capitalize fontbold '>{item.title}</h1>
                            <p className=' text-xs'>{item.subtitle}</p>
                            <Link  className=" text-blue-500 text-xs" target='_blank'  href={item.url}>{item.url}</Link>    
                          </div>
                    </div>
                </div>   
                <div className=" flex gap-2 w-56">
                 <h1 className=" flex items-center w-1/2 bg-[#16161E] justify-center text-xs py-4 rounded-xl flex-col-reverse" >Today clicks<span className=" text-lg">
                 {
                        clicks
                          .filter(
                            c => c.uri === item.url
                            && isToday(c.createdAt)
                          )
                          .length
                      } 
                 </span>
                  </h1>
                 <h1  className=" flex items-center w-1/2 bg-[#16161E] text-xs py-4 justify-center rounded-xl flex-col-reverse" >
                  All time clicks <span className=" text-lg">  {clicks.filter(c => c.uri === item.url).length}</span> </h1>
                </div>
              </div>
              )
            })
          }
        
       </div>


      </div>
    </div>
    </>
  )
}
  else{
    return(
      <div>
        sedf
      </div>
    )
  }
}

export default page;
