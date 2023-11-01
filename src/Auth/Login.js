import React from "react";
import "../App.css";
import { useState, useEffect, useRef } from "react";
import { ImCross } from "react-icons/im";
import axios from "axios";
import "react-phone-number-input/style.css";
import { Navigate, Link } from "react-router-dom";
import { User } from "./AuthContext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoginpage, loginpage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showpassword,setShowpassword]=useState(false)
  const Navigateto=useNavigate()
const [error,setError]=useState('')
  const { setUser} = User();

const hanldeLogin = (event) => {
  event.preventDefault();
  try {
   const { data } = axios.post("/login", {
    email,
    password,
   }).then((res)=>{
    window.localStorage.setItem("user", JSON.stringify(data?.response));
    Navigateto("/");
console.log(res)
    console.log('ddddddddddddddddd')

   })


  
  } catch (err) {

    console.log(error)
  }
 };
 
  //redirect or navigate goes here
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
     <div className=" flex  bg-[#F5F5F7] p-4  items-center justify-center h-[100vh]">
      <div className="flex flex-col  bg-white shadow-lg rounded-[10px] py-4">
        <span className="text-center text-[#5C6574] text-xl font-bold ">
          Sign In
        </span>
        <span className="text-center mt-2 text-[#5C6574] ">
          Welcome back! Please enter your details
        </span>

        <form
          onSubmit={hanldeLogin}
          className="flex flex-col max-[400px]:w-[340px] max-sm:w-[380px] max-md:w-[460px]  w-[500px]  mt-[40px]  p-8 gap-7 m-2 shadow-myshadow rounded-[8px]"
        >
          <div className="flex flex-col">
            <div className="flex flex-col gap-2">
              <label className="text-[#5C6574] font-[500] " htmlFor="email">
                E-mail
              </label>
              <input
              
                id="email"
                className="border-[1px] border-[#DEDEDE] outline-[1px] outline-[#E63946] rounded-md p-2 w-full"
                placeholder="Enter your email"
                onChange={(e)=>setEmail(e.target.value)}


              />
            </div>
            {error && (
              <span className="text-red-600 text-[10px] mt-1.5 ml-0.5">
                {error}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col gap-2" >

            <label className="text-[#5C6574] font-[500] " htmlFor="password">
                Password
              </label>
              <div className="relative flex items-center">
              <input
                id="password"
                className="border-[1px] border-[#DEDEDE] outline-[1px] outline-[#E63946] rounded-md p-2 w-full"
                placeholder="Enter your password"
                type={showpassword?"text":"password"}
                onChange={(e)=>setPassword(e.target.value)}
                
               >
                  
                </input>
                <span className="absolute right-4" onClick={()=>setShowpassword(!showpassword)}>{showpassword?<AiFillEyeInvisible/>:<AiFillEye/>}</span>
                </div>
                
              
             
            </div>
            {error && (
              <span className="text-red-600 ml-0.5 text-[10px] mt-1.5">
                {error}
              </span>
            )}
            
            
          </div>

          <button type="submit" className="bg-red-600 hover:bg-[#ce3340] py-2 rounded-[20px] text-white ">
            Log in
          </button>
        </form>
        <span className="text-red-600 ml-0.5 text-[10px] mt-1.5 text-center" >{error}</span>
        <div className="flex items-center justify-center ml-3 mt-1">
          <span className="text-sm  text-[#5C6574] font-semibold mr-1">
            Don`t have an Account ?
          </span>
          <Link className="cursor-pointer text-[#E63946]" href="/register">
            register
          </Link>
        </div>
      </div>
    </div>
      
    </>
  );
};

export default Login;
