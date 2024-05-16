import React, { useEffect, useState } from 'react'
import '../../Css/RightSidebar.css'
import { isAuthenticated, notFollowedUser } from '../../api/userApi';
import FollowUser from './FollowUser';
import FollowerUserLists from './FollowerUserLists';


const RightSidebar = () => {
  const [user,setUser]=useState([])
  const {token}=isAuthenticated()
  useEffect(()=>{
    notFollowedUser(token)
    .then(data=>{
      if(data.error){
        console.log(data.error)
      }else{
        setUser(data)
      }
    })
    .catch(error=>console.log(error))
  },[])
  // console.log(user)
  return (
    <div className='rigthSidebar'>
      <FollowerUserLists/>

      {/* second div */}
        <div className="suggest">
          <div className="suggest-title">
            <h4>Suggested for you</h4>
            <p>See all</p>
          </div>
          <div className="suggest-all">
            {
              user.map((item)=>{
                return <FollowUser item={item} key={item._id}/>
              })
            }
        
          
          </div>
          </div>


          
    </div>
  )
}

export default RightSidebar