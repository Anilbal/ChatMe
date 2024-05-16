import React from 'react'
import '../../Css/Headers.css'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../api/userApi'

const Headers = () => {
  const {user}=isAuthenticated()
  return (
    <div className='header'>
        <h2>ChatMe</h2>
        {
          user?<>
          <Link to={'/home'}>
        <button>Home</button>
        </Link>
          </>:
          <>
        <Link to={'/login'}>
        <button>Sign in</button>
        </Link>
          </>
        }
    </div>
  )
}

export default Headers