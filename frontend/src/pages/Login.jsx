import React, { useState } from 'react'
import '../Css/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import {  authenicate, login } from '../api/userApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()
    const handleCLick=(e)=>{
      e.preventDefault()
      login(email,password)
      .then(data=>{
        if(data.error){
            toast.error(data.error)
        }else{
          authenicate(data)
          console.log(data)
          Swal.fire({
            title:"You have logged in",
            icon:"success"
          })
          navigate('/home')
        }
      })
      // console.log()
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
                <p className='log-sign'>Sign in</p>
                <form className='log'>
                    <input type="text" placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="text" placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}/>
                </form>
                <button className='log-btn' onClick={handleCLick}>Sign in</button>
                <button className='log-for'>Forgot password?</button>
                <p>New To ChatMe ? <Link to={'/register'}><button className='sign-btn'>Sign up now.</button></Link></p>
            {/* </div> */}
       </div>
    </div>
  )
}

export default Login