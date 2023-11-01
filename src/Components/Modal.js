import { Button, Dialog, IconButton, Input } from '@mui/material'
import React from 'react'
import { RxCross1 } from 'react-icons/rx'
import Slide from '@mui/material/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const Modal = ({open,setOpen}) => {

    const handleClose=()=>{
        setOpen(false)
    }
  return (
    <Dialog
      maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
        TransitionComponent={Transition}
        PaperProps={{
            style:{
                borderRadius:8
            }
        }}
        
      >
<div className='relative min-h-[240px] p-2 max-h-[300px]'>
    <div className=' relative h-full mt-14  rounded-[7px] border border-blue-gray-200  bg-transparent  font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500  focus:outline-0  disabled:bg-blue-gray-50'>
    <input
     className='h-full w-[90%] py-3 px-3 outline-none'
      placeholder="Search Destine"
    />
    
    <IconButton className='absolute right-0' >
              <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
              </IconButton>
   
    </div>

    <IconButton  onClick={()=>{
        handleClose()
    }} sx={{
        position:'absolute',
        right:4,
        top:2,
    }}>
    <RxCross1/>
    </IconButton>

    
</div>
<div className='w-full flex justify-end pb-3 pr-3 '>
<Button  variant='contained' className=' w-[140px]  '>Search</Button>
</div>
      </Dialog>
  )
}

export default Modal