import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeLayout from './layout/HomeLayout'
import Home from './pages/Home'
import Before_login from './pages/Before_login'
import MainLayout from './layout/MainLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import SelectiveRoute from './SelectiveRoute'
import UserLayout from './layout/UserLayout'
import Profile from './pages/profilePages/Profile'
import ProfileFriends from './pages/profilePages/ProfileFriends'
import ProfilePosts from './pages/profilePages/ProfilePosts'
import ProfileActivity from './pages/profilePages/ProfileActivity'
import ProfileGallery from './pages/profilePages/ProfileGallery'
import FriendsAccount from './pages/FriendsAccount'
const MyRoutes = () => {
  return (
    <>
     <BrowserRouter>
     <Routes>
        <Route path='/' element={<HomeLayout/>}>
        <Route index element={<Before_login/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        </Route>
        
        <Route path='/' element={<SelectiveRoute/>}>
        <Route path='home' element={<MainLayout/>}>
            <Route index element={<Home/>}/>
        </Route>
        <Route path='/friendsprofile/:id' element={<FriendsAccount/>}/>
        <Route path='profile' element={<UserLayout/>}>
          <Route index element={<Profile/>}/>
          <Route path='/profile/friends' element={<ProfileFriends/>}/>
          <Route path='/profile/posts' element={<ProfilePosts/>}/>
          <Route path='/profile/activity' element={<ProfileActivity/>}/>
          <Route path='/profile/gallery' element={<ProfileGallery/>}/>
        </Route>
        </Route>

     </Routes>
     </BrowserRouter>   
    </>
  )
}

export default MyRoutes