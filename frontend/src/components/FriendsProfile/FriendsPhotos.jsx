import React, { useEffect, useState } from 'react'
import { singleUserPosts } from '../../api/postApi'
import { isAuthenticated } from '../../api/userApi'
import { useParams } from 'react-router-dom'
import { API_USER } from '../../config'

const FriendsPhotos = () => {
    const [photos,setPhotos]=useState([])
    const {token}=isAuthenticated()
    const {id}=useParams()
    useEffect(()=>{
        singleUserPosts(id,token)
        .then(data=>{
            if(data.error){
              console.log(data.error)
            }else{
              setPhotos(data)
            }
          })
          .catch(error=>console.log(error))
    },[])
    console.log(photos)
  return (
    <>
    <div className="friends-photos">
        <p>Photos ({photos.length})</p>
        <div className="image-grid">
            {
                photos.map((item)=>{
                    return <img src={`${API_USER}/${item.image}`} alt="" />   
                })
            }
        </div>
      </div>
    </>
  )
}

export default FriendsPhotos