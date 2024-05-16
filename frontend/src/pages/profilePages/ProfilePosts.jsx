import React, { useEffect, useState } from 'react'
import NewPostContainer from '../../components/HomeComponents/NewPostContainer'
import UserPostCard from '../../components/HomeComponents/UserPostCard';
import { isAuthenticated } from '../../api/userApi';
import { getPostsByUser } from '../../api/postApi';


const ProfilePosts = () => {

    const [posts,setPosts]=useState([])
    const {token}=isAuthenticated()
  
    useEffect(()=>{
      getPostsByUser(token)
      .then(data=>{
        if(data.error){
          console.log(data.error)
        }else{
          setPosts(data)
        }
      })
    },[])
    // console.log(posts)
  return (
    <div className='profile-post'>
      <div className="newProfile-posts">
        <u>
        <h4>You Can add new post here:</h4>
        </u>
        <NewPostContainer/>
      </div>
      <hr />
      <div className="profilePosts-all">
        <h3>Total Post: {posts.length}</h3>
        {
          posts.length>0 ? posts.map((post)=>(
            <UserPostCard post={post} key={post._id}/>
          ))
          :
          <p className='no-posts'>There is no posts yet!!</p>
        }
      </div>
    </div>
  )
}

export default ProfilePosts