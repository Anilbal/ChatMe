import React from 'react'
import { Link } from 'react-router-dom'
import Headers from './Headers'
import '../../Css/MainHero.css'
const MainHero = () => {
  return (
    <div className='main-hero'>
        <div className="image-div">
        </div>
        <Headers/>
        <div className="details-hero">
            <h2>Discover, connect and  share your Feeling !!</h2>
                <p>People from all over the globe </p>
                <p>Let's make a new friends </p>
                <Link to={'/register'}>
                  <button>Get Started</button>
                </Link>
        </div>
    </div>
  )
}

export default MainHero