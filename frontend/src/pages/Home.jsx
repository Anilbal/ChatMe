import React from 'react'
import '../Css/Home.css'
import LeftSidebar from '../components/HomeComponents/LeftSidebar'
import MainContainer from '../components/HomeComponents/MainContainer'
import RightSidebar from '../components/HomeComponents/RightSidebar'

const Home = () => {

  return (
    <div className='main-home'>
    <LeftSidebar/>
    <MainContainer />
    <RightSidebar/>
    </div>
  )
}

export default Home