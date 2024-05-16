import React, { useEffect, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { BiSolidLike } from "react-icons/bi"; 
import { FaCommentAlt } from "react-icons/fa";
import {  API_USER } from '../../config';
import { getUserById, isAuthenticated } from '../../api/userApi';
import { likePost } from '../../api/postApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AllPostDetails = ({posts,setUpdatedPost}) => {
    const [user,setUser]=useState([])
    const [count,setCount]=useState(false)
    const [like,setLike]=useState([posts.like.includes(user._id)?count===true:count===false])
    const {token}=isAuthenticated()
    useEffect(()=>{
        getUserById(posts.user)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setUser(data)
            }
        })
    },[])

    const handleLiked=(id)=>{
      likePost(id,token)
      .then(data=>{
          if(data.error){
              console.log(data.error)
              setCount(false)
              setUpdatedPost(false)

          }else{
              setLike(data)
              setCount(true)
              setUpdatedPost(true)
              toast.success(data.message)
          }
      })
  }

    // console.log(posts)
  return (
    <div className="second-mainContainer" key={posts._id}>
      <ToastContainer position='top-right'/>
                <div className="second-user">
                  <div className='second-postData'>
                    <img src={`${API_USER}/${user.profile}`} alt={posts.title} className='mainContainer-image'/>
                  <p>{user.username} has posted a new photo</p>
                  </div>
                  <span onClick={()=>handleDelete(posts._id)}><BsThreeDots /></span>
                </div>
                <p className='user-caption'>{posts.title}</p>
                <img src={`${API_USER}/${posts.image}`}  alt="image is loading" className='user-postImage'/>
                <div className="second-like">
                  <ul>
                    <li className={count?"like-icons liked-icons":"like-icons"} onClick={()=>handleLiked(posts._id)}>
                      <BiSolidLike/>
                    </li>
                    <li>{posts.like.length} Like</li>
                  </ul>
                  <ul>
                    <li className='comment-icons'><FaCommentAlt /></li>
                    <li>{posts.comments.length} Comments</li>
                  </ul>
                </div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"5px 20px 15px 20px"}}>
                  <div style={{display:"flex",gap:"10px",alignItems:"center"}}>
                  <img src="https://burst.shopifycdn.com/photos/professional-man-portrait.jpg?width=1000&format=pjpg&exif=0&iptc=0" alt="" className='mainContainer-image'/>
                  <input type="text" placeholder='Write a comment' style={{height:"30px",padding:"5px 10px",width:"400px",outline:"none"}}/>
                  </div>
                  <button  className='mainContainer-btn'>post</button>
                </div>
                {
                  posts.comments.length>0 && posts.comments.map((items)=>{
                    return <div className="second-comments" key={items._id}>
                    <div className="main-comments">
                    <img src="https://burst.shopifycdn.com/photos/professional-man-portrait.jpg?width=1000&format=pjpg&exif=0&iptc=0" alt="" className='mainContainer-image'/>
                    <div className="comments">
                          <h4>{items.username}</h4>
                          <p>{items.comment}</p>
                          </div>
                    </div>
                      <span ><BsThreeDots /></span>
                  </div>
                  })
                }
            </div> 
  )
}

export default AllPostDetails