import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../api/userApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const handleCLick=(e)=>{
    e.preventDefault()
    register(username,email,password)
    .then(data=>{
      if(data.error){
          toast.error(data.error)
      }else{
        toast.success(data.message)
      }
    })
    .catch(error=>console.log(error))
  }
  return (
    <div className='login'>
      <ToastContainer position='top-right'/>
      <Link to={'/'} style={{textDecoration:"none"}}>
       <h2>ChatMe</h2>
      </Link>
       <div className="login-details">
            {/* <div className="log"> */}
                <p className='log-sign'>Welcome to CHATME</p>
                <form className='log'>
                    <input type="text" placeholder='Enter Username' onChange={(e)=>setUsername(e.target.value)}/>
                    <input type="text" placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="text" placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}/>
                    
                </form>
                <button className='log-btn' onClick={handleCLick}>Register</button>
                {/* <button className='log-for'>Forgot password?</button> */}
                <p>Already have account To ChatMe ? <Link to={'/login'}><button className='sign-btn'>Login now.</button></Link></p>
            {/* </div> */}
       </div>
    </div>
  )
}

export default Register