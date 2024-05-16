import React, { useState } from 'react'
import { FaUserPlus } from "react-icons/fa";
import { API_USER } from '../../config';
import { followUser, isAuthenticated } from '../../api/userApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TiTick } from "react-icons/ti";

const FollowUser = ({item}) => {
  const [success,setSuccess]=useState(false)
    const {token}=isAuthenticated()
    const handleFollow=(e)=>{
        followUser(e,token)
        .then(data=>{
            if(data.error){
                console.log(data.error)
                setSuccess(false)
            }else{
              toast.success(data.message)
              setSuccess(true)
            }
        })
        .catch(error=>console.log(error))
    }
  return (
    <div className="user-suggest">
              <div className="suggest-data">
                <img src={`${API_USER}/${item.profile}`} alt={item.username} className='suggest-image'/>
                <p>{item.username}</p>
              </div>
              <span onClick={(e)=>handleFollow(item._id)}>
                {
                  success?<TiTick className='success-follow'/>:<FaUserPlus className='notfollowed'/>
                }
              
              </span>
          </div>
  )
}

export default FollowUser