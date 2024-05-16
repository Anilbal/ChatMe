import React, { useEffect, useState } from 'react'
import { followingUserLists, isAuthenticated } from '../../api/userApi'
import '../../Css/ProfileFriends.css'
import ALlFriendsCard from '../../components/HomeComponents/ALlFriendsCard';

const ProfileFriends = () => {
  const [userLists,setUserLists]=useState([])
    const {token}=isAuthenticated()
    const {user}=isAuthenticated()
    useEffect(()=>{
        followingUserLists(user._id,token)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setUserLists(data)
            }
        })
        .catch(error=>console.log(error))
    },[])

  return (
    <div className='profile-friends'>

      {/* heading */}
        <div className="friends-number">
        <h2>Friends:</h2>
        <p>Total number of friends: {userLists.length}</p>
        </div>

      {/* all frineds details */}
      <div className="profileAll-friends">
        {
          userLists.map((item)=>{
            return <ALlFriendsCard item={item} key={item._id}/>
          })
        }
          
      </div>
    </div>
  )
}

export default ProfileFriends