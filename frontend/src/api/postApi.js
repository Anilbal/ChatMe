import { API_USER } from "../config"

// delete post
export const deletePost=(id,token)=>{
    return fetch(`${API_USER}/deletepost/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// like post
export const likePost=(id,token)=>{
    return fetch(`${API_USER}/like/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// get posts by login user 
export const getPostsByUser=(token)=>{
    return fetch(`${API_USER}/getpostbyuser`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// get posts by user id 
export const getPostsByUserId=(id,token)=>{
    return fetch(`${API_USER}/getpostbyuserid/${id}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// single user  posts 
export const singleUserPosts=(id)=>{
    return fetch(`${API_USER}/singleuserpost/${id}`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}