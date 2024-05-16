import React, { useEffect, useState } from 'react'
import '../../Css/MainContainer.css'

import { deletePost } from '../../api/postApi';
// import { ToastContainer, toast } from 'react-toastify';
  // import 'react-toastify/dist/ReactToastify.css';
import AllPostDetails from './AllPostDetails';
import { followerPost, isAuthenticated } from '../../api/userApi';
import NewPostContainer from './NewPostContainer';

const MainContainer = () => {

  const [updatedPost,setUpdatedPost]=useState(false)
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
      
    },[updatedPost])
    
    // getUserById()

  // const handleDelete=(id)=>{
  //   // e.preventDefault()
  //   deletePost(id,token)
  //   .then(data=>{
  //     if(data.error){
  //       toast.error(data.error)
  //       setUpdatedPost(false)
  //     }else{
  //       setUpdatedPost(true)
  //       toast.success(data.message)
  //     }
  //   })
  // }
  return (
    <div className='mainContainer'>
        <h2>Activity Feed</h2>
        <NewPostContainer/>
          <div className="post-blog">
            <hr />
            <p>All Posts</p>
          </div>
          {
            post.map((item)=>(
              item.map((posts)=>{
                return <AllPostDetails posts={posts} setUpdatedPost={setUpdatedPost} key={posts._id}/>
              }) 
              ))
          }

    </div>

  )
}

export default MainContainer