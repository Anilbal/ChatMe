import React, { useEffect, useState } from 'react'
import { followerUserLists, isAuthenticated } from '../../api/userApi'
import { API_USER } from '../../config'
import { Link } from 'react-router-dom'

const FollowerUserLists = () => {
    const [userLists,setUserLists]=useState([])
    const {token}=isAuthenticated()
    const {user}=isAuthenticated()
    useEffect(()=>{
        followerUserLists(user._id,token)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setUserLists(data)
            }
        })
        .catch(error=>console.log(error))
    },[])

    // console.log(userLists)
  return (
 <div className="blog" >
            <h4>Followers</h4>
            <p>This is a list of user who followed your account.</p>
            <div className="blog-all">
            {
                userLists.map((item)=>{
            return <div className="blogging" key={item._id}>
                  <img src={`${API_USER}/${item.profile}`} alt=""  className='blog-image'/>
                  <Link to={`/friendsprofile/${item._id}`} className='react-link'>
                 <p>{item.username}</p>
                  </Link>
               </div>
        })
    }
            </div>
         </div>
  )
}

export default FollowerUserLists