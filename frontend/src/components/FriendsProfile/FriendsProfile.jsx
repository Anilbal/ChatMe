import React, { useEffect, useState } from 'react'
import { getUserById } from '../../api/userApi'
import { useParams } from 'react-router-dom'
import { API_USER } from '../../config'
import FriendsPhotos from './FriendsPhotos'
import FriendsFollowing from './FriendsFollowing'

const FriendsProfile = () => {
    const [users,setUsers]=useState({})
    const [updatedUser,setUpdatedUser]=useState(false)
    const {id}=useParams()
    useEffect(()=>{
      getUserById(id)
      .then(data=>{
        if(data.error){
          console.log(data.error)
        }else{
          setUsers(data)
        }
      })
      .catch(error=>console.log(error))
    },[updatedUser])

    console.log(users)
  return (
    <div className='friendsMain-profile'>
    <div className='friends-details'>
      <u>
      <h2>{users.username} Profile:</h2>
      </u>
      <div className='firstFriends_div'>
      <div className="image_div">
        <img src={`${API_USER}/${users.profile}`} alt={users.username} />
      </div>
      <div className="friends_usernameDiv">
          <div>
          <h3>{users.username}</h3>
          <p>{users.occupation}</p>
          </div>
          <p>{users.bio}</p>
          <button>Follow</button>
      </div>
      </div>
      {/* seconds div */}
          <FriendsPhotos/>       
      
    </div>
    <FriendsFollowing setUpdatedUser={setUpdatedUser} />
    </div>
  )
}

export default FriendsProfile