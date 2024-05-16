import React, { useEffect, useState } from 'react'
import { FaCommentAlt } from 'react-icons/fa'
import { BiSolidLike } from 'react-icons/bi'
import { BsThreeDots } from "react-icons/bs";
import { API_USER } from '../../config';
import { getUserById } from '../../api/userApi';
const UserPostCard = ({post}) => {
    const [user,setUser]=useState([])
    useEffect(()=>{
        getUserById(post.user)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setUser(data)
            }
        })
    },[])

    const handleDelete = () => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You want to delete this post!!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          confirmButtonColor: '#007f5f', // Custom confirm button color
          cancelButtonColor: '#d00000', // Custom cancel button color
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('Deleted!', 'Your post has been deleted.', 'success')
          } else{
            Swal.fire('Cancelled', 'Your post is not deleted!!', 'info')
          }
        })
      }
      
  return (
    <div className='userprofile-posts'>
    <div className="second-mainContainer">
                <div className="second-user">
                  <div className='second-postData'>
                    <img src={`${API_USER}/${user.profile}`} alt="" className='mainContainer-image'/>
                  <p>{user.username} has posted a new photo</p>
                  </div>
                  <span onClick={()=>handleDelete()}><BsThreeDots /></span>
                </div>
                <p className='user-caption'>{post.title}</p>
                <img src={`${API_USER}/${post.image}`}  alt="image is loading" className='user-postImage'/>
                <div className="second-like">
                  <ul>
                    <li className="like-icons">
                      <BiSolidLike/>
                    </li>
                    <li>{post.like.length} Like</li>
                  </ul>
                  <ul>
                    <li className='comment-icons'><FaCommentAlt /></li>
                    <li>{post.comments.length}  Comments</li>
                  </ul>
                </div>
                <hr />
                {
                    post.comments.length>0?
                 <div className="second-comments">
                    <div className="main-comments">
                    <img src="https://burst.shopifycdn.com/photos/professional-man-portrait.jpg?width=1000&format=pjpg&exif=0&iptc=0" alt="" className='mainContainer-image'/>
                    <div className="comments">
                          <h4>Username</h4>
                          <p>Comments</p>
                          </div>
                    </div>
                      <span ><BsThreeDots /></span>
                  </div>
                  :
                  <p className='no-comments'>No comments yet!!</p>
                }
            </div> 
            </div>
  )
}

export default UserPostCard