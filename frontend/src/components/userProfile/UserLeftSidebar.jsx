import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../Css/UserProfile.css'
import { FaHome } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { GrGallery } from "react-icons/gr";


const UserLeftSidebar = () => {
    const [active,setActive]=useState('dashboard')

    const activeDashboard=(i)=>{
        setActive(i)
    }
  return (  
        <div className="user-dashboard">     
            {/* <Link to='/profile'>   
            <div className={active==="dashboard"?"icons-admin active-admin":"icons-admin"} >
            <i><FaHome /></i>
            <li>Dashboard</li>
            https://img.freepik.com/free-vector/twitter-interface-concept_23-2148584531.jpg
            </div>
            </Link>  */}
            <ul>
                <Link to='/profile' className='react-link'>
                    <li onClick={()=>activeDashboard('dashboard')} className={active==="dashboard"?"icons-profile active-profile":"icons-profile"}>
                    <i><FaHome /></i>
                    Dashboard
                    </li>
                </Link>

                <Link to='/profile/friends' className='react-link'>
                <li onClick={()=>activeDashboard('friends')} className={active==="friends"?"icons-profile active-profile":"icons-profile"}>
                    <i><MdGroups /></i>
                    Friends
                </li>
                </Link>

                <Link to='/profile/gallery' className='react-link'>
                <li onClick={()=>activeDashboard('gallery')} className={active==="gallery"?"icons-profile active-profile":"icons-profile"}>
                <i><GrGallery /></i>
                    Gallery
                </li>
                </Link>

                <Link to='/profile/posts' className='react-link'>
                <li onClick={()=>activeDashboard('posts')} className={active==="posts"?"icons-profile active-profile":"icons-profile"}>
                    <i><MdPostAdd /></i>
                    Posts
                </li>
                </Link>

                <Link to='/profile/activity' className='react-link'>
                <li onClick={()=>activeDashboard('activity')} className={active==="activity"?"icons-profile active-profile":"icons-profile"}>
                    <i><IoIosNotifications /></i>
                    Activity
                </li>
                </Link>
                
            </ul>
    </div>
  )
}

export default UserLeftSidebar