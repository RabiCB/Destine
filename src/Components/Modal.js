import { Button, Dialog, IconButton, Input } from "@mui/material";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Modal = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };



  const [search,setSearchquery]=useState('')
const navigate=useNavigate()


  const handleSearch=()=>{
  try{

    if(search){
      navigate(`/search/${search}`)
      setOpen(false)
        
  
     }
      
  } catch(err){
    console.log(err)
  }
 
 
 
   }
   

   const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      // Prevent form submission
      if(search){
        handleSearch()
      }
      
    }
  };

  
  return (
    <Dialog
      maxWidth="md"
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          borderRadius: 8,
        },
      }}
    >
      
      <div className="relative min-h-[180px] p-2 max-h-[300px]">
        
      <div className="relative flex items-center mt-16">
        <input
          onChange={(e)=>setSearchquery(e.target.value)
          }
          onKeyPress={handleInputKeyPress}
          className="border-[1px] border-[#DEDEDE] outline-[1px] outline-[#E63946] rounded-md p-2 w-full"
          placeholder="Search Destine"
        ></input>
        <IconButton className="absolute right-10">
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
        <IconButton
          onClick={() => {
            handleClose();
          }}
          sx={{
            position: "absolute",
            right: 4,
            top: 2,
          }}
        >
          <RxCross1 />
        </IconButton>
      </div>
      <div className="w-full flex justify-end pb-3 pr-3 ">
        <Button onClick={()=>{
handleSearch()
        }} disabled={search.length<1} variant="contained" className=" w-[140px]  ">
          Search
        </Button>
      </div>
    </Dialog>
  );
};

export default Modal;
