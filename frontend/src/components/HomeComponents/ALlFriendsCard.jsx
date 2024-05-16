import React, { useEffect, useState } from 'react'
import { FaUserFriends } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { BiSolidLike } from "react-icons/bi";
import { API_USER } from '../../config';
import { getPostsByUserId } from '../../api/postApi';
import { isAuthenticated } from '../../api/userApi';
import { Link } from 'react-router-dom';

const ALlFriendsCard = ({item}) => {
    const [users,setUsers]=useState([])
    const {token}=isAuthenticated()
    useEffect(()=>{
        getPostsByUserId(item._id,token)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setUsers(data)
            }
        })
    },[])

    console.log(item)
  return (
    <div className="friendsProfile-div">
            <Link to={`/friendsprofile/${item._id}`} className='react-link'>
              <div className="image-username">
                  <img src={`${API_USER}/${item.profile}`} alt={item.username} />
                  <div style={{display:"flex",flexDirection:"column",gap:"5px",color:"black"}}>
                  <h3>{item.username}</h3>
                  <p>{item.bio}</p>
                  </div>
              </div>
            </Link>
              <hr />
              <div className='allUser_info'>
                  <div className="sub-infoProfile">
                      <span className='friends-icons'><FaUserFriends /></span>
                      <p>{item.following.length}</p>
                  </div>
                  <div className="sub-infoProfile">
                        <span className='friends-icons'><GrGallery /></span>
                            <p>{users.totalPost}</p>

                  </div>
                  <div className="sub-infoProfile">
                        <span className='friends-icons'><BiSolidLike /></span>
                        <p>{users.mainTotalLikes}</p>
                  </div>
              </div>
          </div>
  )
}

export default ALlFriendsCard