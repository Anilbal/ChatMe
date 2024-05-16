import React, { useState } from 'react'
import { isAuthenticated, updateUsers } from '../../api/userApi'
import { API_USER } from '../../config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Profile = () => {
  const {user}=isAuthenticated()
  const {token}=isAuthenticated()

  // console.log(user)
  const [users,setUsers]=useState({
    username:"",
    occupation:"",
    bio:"",
    email:"",
    password:"",
    profile:"",
    formData:new FormData
  })

  const {formData,username,bio,occupation,email,password}=users

  const handleUser=(e)=>{
    
    let name=e.target.name
    let value=e.target.value
    if(name=="profile"){
      formData.set(name,e.target.files[0])
    }else{
      setUsers({...users,[name]:value})
      formData.set(name,value)
    }
  }
 
  
  const handleCLick=(e)=>{
    e.preventDefault()
    updateUsers(user._id,formData,token)
    .then(data=>{
      if(data.error){
        console.log(error)
      }else{
        setUsers(data)
        toast.success("Your account update Successfully!!")
      }
    })
  }
  // console.log(users)
  return (
    <div className='profile-page'>
      <ToastContainer position='top-right'/>
      {user.profile?<>
        <img src={`${API_USER}/${user.profile}`} alt="image is loading" className='cover-image'/>
        <img src={`${API_USER}/${user.profile}`} alt={user.username} className='profile-image' />
      </>:
      <>
      <p className='no-cover'></p>
      <p className='no-profile'>Profile</p>
      </>}
        <div className="bio">
        <h3>{user.username}</h3>
          <p>{user.occupation}</p>
          <h3>Bio:</h3>
          <p>{user.bio} </p>
        </div>
        <hr />
        <div className="edit-profile">
          <h2>Edit profile:</h2>
          <form>
            <label htmlFor="username">Username</label>
            <input type="text" id='username' value={username} name='username' onChange={handleUser} placeholder='Enter your new Username' />

            <label htmlFor="occupation">Choose your occupation</label>
            <select name="occupation" id="occupation" className='profile-select' value={occupation}
            onChange={handleUser}>
            <option defaultChecked>Choose your occupation</option>
              <option value="student">Student</option>
              <option value="artist">Artist</option>
              <option value="writer">Writer</option>
              <option value="dancer">Dancer</option>
              <option value="singer">Singer</option>
              <option value="comedian">Comedian</option>
            </select>
            <label htmlFor="bio">Bio</label>
            <input type="text" id='bio' placeholder='Write your bio here..' value={bio} name='bio' onChange={handleUser}/>
            <label htmlFor="email">Email</label>
            <input type="text" id='email' value={email} name='email' onChange={handleUser} placeholder='Enter your new email'/>
            <label htmlFor="password">New Password</label>
            <input type="text" id='password' placeholder='Your new password' value={password} name='password' onChange={handleUser}/>
            <label htmlFor="image">New profile image</label>
            <input type="file" id='image' name='profile' className='image-form' onChange={handleUser}/>
          </form>
          <button onClick={handleCLick}>Update profile</button>
        </div>
    </div>
  )
}

export default Profile