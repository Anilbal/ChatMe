import React from 'react'
import { FaCamera } from "react-icons/fa";
import { IoMdVideocam } from "react-icons/io";
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../api/userApi';
import { API_USER } from '../../config';

const NewPostContainer = () => {
  const {user}=isAuthenticated()
  return (
    <div className="first-maincontainer">
              <div className="first-status">
              <Link to={'/profile'}>
                <img src={`${API_USER}/${user.profile}`} alt="" className='mainContainer-image'/>
              </Link>
                <textarea name="status" id="status" cols="50" rows="2" placeholder="Share what's on your mind,username"/>
              </div>
              <hr />
              <div className="first-post">
                <div className="icons-maincontainer">
                  <input type="file" id='camera' />
                  <label htmlFor='camera'><FaCamera /></label>
                  <input type="file" id='video' />
                  <label htmlFor='video'><IoMdVideocam /></label>
                  <select>
                    <option value="new_post">New post</option>
                    <option value="new_blog">New blog</option>
                  </select>
                </div>
                <button className='mainContainer-btn'>Post</button>
              </div>
          </div>
  )
}

export default NewPostContainer