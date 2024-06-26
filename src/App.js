import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Components/Navbar";
import { UserContextProvider } from "./Auth/AuthContext";
import axios from "axios";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Profile from "./Auth/Profile";
import Foralluser from "./Components/Foralluser";
import Bookings from "./Components/Bookings";
import Search from "./Components/Search";
import { apis } from "./constants";

function App() {
  axios.defaults.baseURL = `${apis.url}`;

 
  axios.defaults.withCredentials = true;
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/account/:subpage?" element={<Profile/>}/>
            <Route path="/account/:subpage/:action" element={<Profile/>}/>
            <Route path="/information/accomodation/:id" element={<Foralluser/>}/>
            <Route path="/search/:slug" element={<Search/>}/>
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
