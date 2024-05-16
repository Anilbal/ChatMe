import React from 'react'
import Navbar from '../components/Navbar'
import UserLeftSidebar from '../components/userProfile/UserLeftSidebar'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
        <Navbar/>
    <div className='user-layout'>
        <UserLeftSidebar/>
        <Outlet/>
    </div>
    </>
  )
}

export default UserLayout