import React from 'react'
import '../Css/Navbar.css'
import { CiSearch } from "react-icons/ci";
import { LuBell } from "react-icons/lu";
import { FaFacebookMessenger } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../api/userApi';
import { API_USER } from '../config';
import Swal from 'sweetalert2';


const Navbar = () => {

  const {user}=isAuthenticated()
  const navigate=useNavigate()
  const handleLogout=()=>{
    logout()
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }else{
        Swal.fire({
          title:"You have logout",
          icon:"success",
          timer:1500
        })
        navigate('/login')
      }
    })
  }
  return (
    <div className='navbar'>
      <Link to={'/home'} style={{textDecoration:"none"}}>
        <h2>CHATME</h2>
      </Link>
        <div className="search">
            <span><CiSearch /></span>
            <input type="text" name="" id=""  placeholder='Search your friends'/>
        </div>
        <div className="nav-details">
        <ul>
          <li><LuBell /></li>
          <li><FaFacebookMessenger /></li>
          <Link to={'/profile'}>
          <li>
            <img src={`${API_USER}/${user.profile}`} alt="" className='nav-img'/>
            </li>
            </Link>
          <li onClick={()=>handleLogout()}><AiOutlineLogout /></li>
        </ul>
        </div>
    </div>
  )
}

export default Navbar