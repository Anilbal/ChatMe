import React from 'react'
import '../../Css/Footer.css'
import { FaHome } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";


const Footer = () => {
  return (
    <div className='footer'>
      <div className='sub-footer'>
        <h2>CHATME</h2>
        <div className="pages">
          <h3>Pages</h3>
          <ul>
            <li>Home</li>
            <li>Login</li>
            <li>Register</li>
          </ul>
        </div>
        <div className="useful-links">
          <h3>Useful Links</h3>
        <ul>
            <li>Your Account</li>
            <li>Discover friends</li>
            <li>Help</li>
          </ul>
        </div>
        <div className="contact">
          <h3>Contact</h3>
          <ul>
            <li><FaHome />Nepal</li>
            <li><MdEmail />anilfullstack@gmail.com</li>
            <li><MdPhone /> Contact Us</li>
          </ul>
        </div>
        </div>
        <hr />
        <p className='copy-right'>&copy; CHATME NEPAL</p>
    </div>
  )
}

export default Footer