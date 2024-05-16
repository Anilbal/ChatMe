import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { followingUserLists, isAuthenticated } from '../../api/userApi'
import { API_USER } from '../../config'

const FriendsFollowing = ({setUpdatedUser}) => {
    const [userLists,setUserLists]=useState([])
    const {token}=isAuthenticated()
    const {id}=useParams()
    useEffect(()=>{
        followingUserLists(id,token)
        .then(data=>{
            if(data.error){
                console.log(data.error)
                setUpdatedUser(false)
            }else{
                setUserLists(data)
                setUpdatedUser(true)
            }
        })
        .catch(error=>console.log(error))
    },[])
    // console.log(userLists)
  return (
    <div className='left-friends'>
        <h2>Friends:</h2>
        {
            userLists.map((item)=>{
                return  <div className="friendsFollowing" key={item._id}>
                <img src={`${API_USER}/${item.profile}`} alt="" />
                <Link to={`/friendsprofile/${item._id}`} className='react-link'>
                <p>{item.username}</p>
                </Link>
            </div>
            })
        }
       
    </div>
  )
}

export default FriendsFollowing