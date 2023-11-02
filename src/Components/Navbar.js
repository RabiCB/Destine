import React, { useState, useEffect } from "react";
import { FaAirbnb } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineSearch } from "react-icons/ai";
import { useRef } from "react";
import { Navigate, Link, useNavigate, useNavigation } from "react-router-dom";
import { User } from "../Auth/AuthContext";
import axios from "axios";
import Dialog from "@mui/material";
import { Button, IconButton } from "@mui/material";
import Modal from "./Modal";

const Navbar = () => {
  const [profile, setProfile] = useState(false);
  const [redirect, setRedirect] = useState(null);
const [open,setOpen]=useState(false)
  const { user, setUser } = User();
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (profile && ref.current && !ref.current.contains(e.target)) {
        setProfile(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [profile]);
  const navigate = useNavigate();
  async function handlelogout() {
    try {
      await axios.post("/logout");
      setUser(null);
      navigate("/");
      setProfile(false);
    } catch (err) {
      alert("something happed");
    }
  }



  const [searchvalue,setSearchvalue]=useState('')


  const handleSearch=()=>{

   if(searchvalue){
    navigate(`/search/${searchvalue}`)
      

   }
    



  }

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      handleSearch()
    }
  };
  return (
    <>
      <div className="flex fixed top-[-4px]  left-0 right-0 z-30 bg-gray-50 items-center overflow-hidden justify-between h-[72px]  px-12 max-md:px-8 border-none">
        <Link to="/">
          <div className="flex gap-2 items-start justify-start">
            
            <span className="font-bold text-xl  text-red-600">
              DestinE
            </span>
          </div>
        </Link>
        <div className="flex gap-2 items-center justify-center border-[1px] px-2 max-md:hidden py-[4px] bg-white   border-slate-300 rounded-lg">
        <input
              type="text"
              onKeyPress={handleInputKeyPress}
             onChange={(e)=>setSearchvalue(e.target.value)}
              className=" pl-2  w-full  border-none outline-none bg-none  rounded-lg h-[32px]"
              placeholder="Search Destine "
            />
            <button onClick={()=>{
              handleSearch()
            }}>
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
            </button>

         
        </div>
        <div className="flex gap-4 items-center justify-center ">
          
            <div  className="max-md:block hidden cursor-pointer">
              <IconButton onClick={()=>{
                setOpen(true)
              }}>
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
          

          <div
            onClick={() => setProfile(!profile)}
            className="flex gap-[6px] items-center w-auto h-[30px] justify-center border-[1px] border-slate-200 shawdow-gray-200 rounded-full px-2 py-2 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            {user ? (
              <p className="text-[8px] pointer-events-none">{user.name}</p>
            ) : null}
          </div>
        </div>
        {profile ? (
          <div
            ref={ref}
            className="fixed shadow-gray-200 z-100 flex items-start justify-start gap-2 flex-col bg-gray-200 h-[192px] w-[220px] top-[74px] rounded-lg right-0 mr-12 z-4"
          >
            {!user ? (
              <div className="flex flex-col items-start justify-start gap-2 py-2">
                <Link
                  className="text-[14px] font-semibold cursor-pointer  w-[220px] hover:bg-white  pl-2 "
                  to="/signup"
                  onClick={() => setProfile(false)}
                >
                  Sign up
                </Link>
                <Link
                  className=" text-[14px]  w-[220px] hover:bg-white cursor-pointer pl-2  "
                  to="/login"
                  onClick={() => setProfile(false)}
                >
                  Log in
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-start justify-start gap-2 py-2">
                <Link
                  to="/account"
                  className="text-[14px] font-semibold   w-[220px] hover:bg-white cursor-pointer pl-2 "
                  onClick={() => setProfile(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handlelogout}
                  className=" text-[14px]  w-[220px] hover:bg-white cursor-pointer pl-2  "
                >
                  Log out
                </button>
              </div>
            )}
            <hr className="w-full h-[2px] bg-gray-400 opacity-50" />
            <div className="flex flex-col items-start justify-start gap-2  py-2">
              <a className="text-[14px] w-[220px]  hover:bg-white cursor-pointer pl-2">
                Airnb your home
              </a>
              <a className="text-[14px]  w-[220px] hover:bg-white cursor-pointer pl-2 ">
                Host an experience
              </a>
              <a className="text-[14px]   w-[220px] hover:bg-white cursor-pointer pl-2 ">
                help
              </a>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
<Modal open={open} setOpen={setOpen} />
      
    </>
  );
};

export default Navbar;
