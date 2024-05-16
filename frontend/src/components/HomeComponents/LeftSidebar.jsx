import React, { useEffect, useState } from 'react'
import '../../Css/LeftSidebar.css'
import { FaSquarePlus } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { followerPost, isAuthenticated } from '../../api/userApi';
import { API_USER } from '../../config';
import { Link } from 'react-router-dom';


const LeftSidebar = () => {

  const [post,setPost]=useState([])
    const {user}=isAuthenticated()
    // const {token}=isAuthenticated()
    useEffect(()=>{
      followerPost(user._id)
      .then(data=>{
        if(data.error){
          console.log(data.error)
        }else{
          setPost(data)
        }
      })
      
    },[])

  return (
    <div className='leftsidebar'>
        <div className="activity">
          <div className="activity-title">
            <h4>Activity</h4>
            <Link to={'/profile/activity'} className='react-p'>
            <p>See all</p>
            </Link>
          </div>
          <div className="userNotice">
          <div className="notice">
            <div className="user-notice">
              <img src="https://t4.ftcdn.net/jpg/03/26/98/51/360_F_326985142_1aaKcEjMQW6ULp6oI9MYuv8lN9f8sFmj.jpg" alt="" className='left-image'/>
              <p>User started following you</p>
            </div>
            <span><FaSquarePlus /></span>
          </div>
          <div className="notice">
            <div className="user-notice">
              <img src="https://t4.ftcdn.net/jpg/03/26/98/51/360_F_326985142_1aaKcEjMQW6ULp6oI9MYuv8lN9f8sFmj.jpg" alt="" className='left-image'/>
              <p>User has liked your post</p>
            </div>
            <span><FaHeart /></span>
          </div>
          <div className="notice">
            <div className="user-notice">
              <img src="https://t4.ftcdn.net/jpg/03/26/98/51/360_F_326985142_1aaKcEjMQW6ULp6oI9MYuv8lN9f8sFmj.jpg" alt="" className='left-image'/>
              <p>User started following you</p>
            </div>
            <span><FaSquarePlus /></span>
          </div>
          <div className="notice">
            <div className="user-notice">
              <img src="https://t4.ftcdn.net/jpg/03/26/98/51/360_F_326985142_1aaKcEjMQW6ULp6oI9MYuv8lN9f8sFmj.jpg" alt="" className='left-image'/>
              <p>User has liked your post</p>
            </div>
            <span><FaHeart /></span>
          </div>
          <div className="notice">
            <div className="user-notice">
              <img src="https://t4.ftcdn.net/jpg/03/26/98/51/360_F_326985142_1aaKcEjMQW6ULp6oI9MYuv8lN9f8sFmj.jpg" alt="" className='left-image'/>
              <p>User started following you</p>
            </div>
            <span><FaSquarePlus /></span>
          </div>
          <div className="notice">
            <div className="user-notice">
              <img src="https://t4.ftcdn.net/jpg/03/26/98/51/360_F_326985142_1aaKcEjMQW6ULp6oI9MYuv8lN9f8sFmj.jpg" alt="" className='left-image'/>
              <p>User has liked your post</p>
            </div>
            <span><FaHeart /></span>
          </div>
          <div className="notice">
            <div className="user-notice">
              <img src="https://t4.ftcdn.net/jpg/03/26/98/51/360_F_326985142_1aaKcEjMQW6ULp6oI9MYuv8lN9f8sFmj.jpg" alt="" className='left-image'/>
              <p>User started following you</p>
            </div>
            <span><FaSquarePlus /></span>
          </div>
          <div className="notice">
            <div className="user-notice">
              <img src="https://t4.ftcdn.net/jpg/03/26/98/51/360_F_326985142_1aaKcEjMQW6ULp6oI9MYuv8lN9f8sFmj.jpg" alt="" className='left-image'/>
              <p>User has liked your post</p>
            </div>
            <span><FaHeart /></span>
          </div>

          </div>
          
        </div>
        <div className="explore">
            <div className="explore-title">
              <h4>Explore</h4>
              <p>See all</p>
            </div>
            <div className="explore-all">
              {
                post.map((item)=>(
                  item.map((posts)=>{
                    return <img src={`${API_USER}/${posts.image}`} alt="" key={posts._id}/>
                  })
                ))
              }
              
            </div>
        </div>
    </div>
  )
}

export default LeftSidebar