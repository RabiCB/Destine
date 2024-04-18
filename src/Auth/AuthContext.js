import axios from "axios";
import {useEffect,useState,useContext,createContext} from "react"
import Cookies from 'js-cookie';
export const UserContext=createContext({})

export function User(){
    return useContext(UserContext)
}
export const UserContextProvider=({children})=>{
    const [user,setUser]=useState(null)
    const[place,setPlace]=useState([])
    useEffect(()=>{
        let cookie=Cookies.get("user_id")
      
             axios.get("/profile",{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+ cookie
                }
             }).then((res)=>{
                setUser(res?.data)
               
                

                localStorage.setItem("user",res?.data)

             
             })
    

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[Cookies.get("user_id")])
   

    return(
        <UserContext.Provider value={{user,setUser,place}}>
         {children}
        </UserContext.Provider>
        
    )

}

