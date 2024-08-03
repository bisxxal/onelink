import PublicLinks from '@/components/forms/PublicLinks';
import { PageModel } from '@/models/Page'; 
import { Event } from '@/models/Event'; 
import { UserModel } from '@/models/User';
import Link from 'next/link';
import { CiLocationOn } from "react-icons/ci"; 
import ConnectDb from '@/lib/connect';
import { redirect } from 'next/navigation';
 

async function page({params}) {
  const uri = params.uri

  ConnectDb()
  let page = await PageModel.findOne({ uri }).lean();
  if (page) {
    page = JSON.parse(JSON.stringify(page)); 
}
  let user = await UserModel.findOne({ email: page?.owner }).lean();
  if (user) {
    user = JSON.parse(JSON.stringify(user)); 
}
  await Event.create({uri:uri, page:uri, type:'view'});

  if (!page) {  
    redirect('/')
  }
  
  return (
    <div className='userbg w-full min-h-screen relative pb-28 overflow-hidden '>
     <div  className={` max-lg:h-48 h-60 rounded-b-lg flex justify-center items-center  bg-no-repeat bg-cover bg-center `}
        style={page?.bgType === 'color' ? { backgroundColor: page?.bgColor } : {backgroundImage:`url(${page?.bgImage})`}  }>
     </div>
    <div className=' max-lg:h-28 max-lg:w-28 w-36 h-36 max-lg:-mt-10 -m-16 border-[4px] border-zinc-300 rounded-full overflow-hidden mx-auto'>
      <img className=' bg-cover h-full w-full' src={user?.image}/>
    </div>

    <div className='flex w-full items-center gap-2  flex-col justify-cente mt-20'>
      <h1 className='font-bold text-3xl '>{page?.displayName}</h1> 
      <p className=' text-sm flex gap-1 '><CiLocationOn className=' text-lg' />{page?.location}</p> 
      <p className=' text-sm text-center'>{page?.bio}</p> 
    </div>

    

    <Link href={'/'}>
    <div className='flex items-center z-20 justify-center text-lg fixed bottom-6 backdrop-blur bg-[#0000003a] h-14 rounded-full max-lg:left-[25%] left-[40%] max-lg:w-[200px] w-[300px] '>
        <h1> One Link </h1>
    </div>
    </Link>

    <div>
      <PublicLinks page={page} />
    </div>

    </div>
  )
}

export default page