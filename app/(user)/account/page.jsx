import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth' 
import UserName from '@/components/forms/UserName'
import { PageModel } from '@/models/Page'
import ConnectDb from '@/lib/connect'
import UserSettingPage from '@/components/forms/UserSettingPage'
import AccountPageButton from '@/components/buttons/AccountPageButton'
import AccountLinkes from '@/components/forms/AccountLinkes'
import UserSideBar from '@/components/UserSideBar'
import IphonePreview from '@/components/IphonePreview' 

async function Account({searchParams}) {
    const session  = await getServerSession(authOptions)
    const username = searchParams.username

    if(!session){ redirect('/')}
    ConnectDb()
    let page = await PageModel.findOne({owner:session?.user?.email});
    if (page) {
      page = JSON.parse(JSON.stringify(page)); 
      page.buttons = page.buttons || {};    
    } else {
        page = { buttons: {} };  
    }
  
    
    if (page !== null && page !== undefined && page.uri) { 
      return( <>
       <div className=' relative w-full flex max-lg:p-2 p-4 bg-[#000319]  min-h-screen'> 
       <UserSideBar name={page.uri} image={session?.user?.image}/> 

       <div className="ml-56 mr-80 max-lg:mx-0 w-full">
       <UserSettingPage page={page} image={session?.user?.image} user={session?.user?.email} /> 
         <AccountPageButton page={page}  user={session?.user}/>
         <AccountLinkes page={page} user={session?.user?.email} /> 
         </div>
         <IphonePreview page={page} image={session?.user?.image} />
       </div>
        
      </>
      )
    }
  else{
    return (
      <div className=' flex items-center justify-center  '>
          
     <UserName username={username}/>
  
      </div>
    )
  }
}

export default Account