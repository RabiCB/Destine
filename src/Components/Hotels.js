import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from '@tanstack/react-query'
import Imageloader from './Imageloader'




const Hotels =() => {
  const [places,setPlaces]=useState([])



   const getAllhotels=async()=>{
    const res=await fetch(`https://airbnbclone-3off.onrender.com/allplaces`)

    return res?.json()
   }


   const {data,isLoading}=useQuery({
    queryKey:['getAllhotels'],
    queryFn:getAllhotels
   })

  




   if(isLoading){
    return <div className='flex items-center justify-center h-[100vh]'><ThreeDots 
    height="80" 
    width="80" 
    radius="9"
    color="gray" 
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    wrapperClassName=""
    visible={true}
     /></div>
   }

   
  return (
 
    <div className='grid grid-cols-4   p-6 max-lg:grid-cols-3 gap-4 max-md:grid-cols-3 max-sm:grid-cols-1'>
    {
      
      data?.map((hotels)=>{
        return<Link to={"/information/accomodation/"+ hotels?._id}><div className=' flex items-start justify-start flex-col gap-[4px]'>
         
         <img alt="hotelimg" className='rounded-2xl  h-full w-full aspect-square ' src={`https://airbnbclone-3off.onrender.com/uploads/${hotels?.photos[0]}`}/>
         
          
          <span className="font-bold ">{hotels?.address}</span>
          <p className='text-[14px] text-slate-500'>{hotels?.description.substring(0,24)}...</p>
          <p className='text-[14px] text-slate-500'>{hotels?.extraInfo}</p>
          <p className='font-bold text-[14px]'>$ {hotels?.price} price per night</p>
          </div>
          </Link>
          

      })
    }


    
    </div>
  )
}

export default Hotels
