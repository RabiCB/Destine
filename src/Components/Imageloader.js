import { Skeleton } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Imageloader = ({hotels}) => {
    const [loader,setLoader]=useState(false)
    const [imageurl,setImageurl]=useState('')
    useEffect(()=>{
     setLoader(true)
        const imgurl= `https://airbnbclone-3off.onrender.com/uploads/${hotels.photos[0]}`
        
        setTimeout(()=>{
            
            setLoader(false)
            setImageurl(imgurl)
        },1000)

    },[hotels])

    console.log(loader)
  return (
    <>
    {!loader?<img alt="hotelimg" className='rounded-2xl object-cover h-full w-full aspect-square ' src={imageurl}/>:<Skeleton variant="rectangular rounded-md" className='w-full h-full' height={200}  />}

    
    </>
  )
}

export default Imageloader