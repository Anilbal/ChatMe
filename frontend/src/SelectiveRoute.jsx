import React from 'react'
import { isAuthenticated } from './api/userApi'
// import { isAuthenicated } from './api/userApi'
import { Navigate, Outlet } from 'react-router-dom'

const SelectiveRoute = () => {
    const {user}=isAuthenticated()
  return (
    <>
      {
        user?
        <>
        <Outlet/>
        </>:
        <>
        <Navigate to={'/login'}/>
        </>
      }  
    </>
  )
}

export default SelectiveRoute