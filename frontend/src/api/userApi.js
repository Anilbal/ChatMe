import { API_USER } from "../config"

export const login=(email,password)=>{
    return fetch(`${API_USER}/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",

        },
        body:JSON.stringify({email,password})
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}
export const register=(username,email,password)=>{
    return fetch(`${API_USER}/register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",

        },
        body:JSON.stringify({username,email,password})
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// storing user data in localstorage
export const authenicate=(userInfo)=>{
    return  localStorage.setItem('jwt',JSON.stringify(userInfo))
}
 
export const isAuthenticated=()=>{
     if(localStorage.getItem("jwt")){
         return JSON.parse(localStorage.getItem('jwt'))
     }
     else{
         return false
     }
 }

// get follower post 
export const followerPost=(id)=>{
    return fetch(`${API_USER}/followerpost/${id}`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// get user details by id
export const getUserById=(id)=>{
    return fetch(`${API_USER}/singleuser/${id}`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}


// list of user to be followed
export const notFollowedUser=(token)=>{
    return fetch(`${API_USER}/newfriends`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

export const followUser=(id,token)=>{
    return fetch(`${API_USER}/followinguser/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// get list of user who follwed you
export const followerUserLists=(id,token)=>{
    return fetch(`${API_USER}/followersuserlists/${id}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// get list of user  follwed by you
export const followingUserLists=(id,token)=>{
    return fetch(`${API_USER}/followinguserlists/${id}`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}


// update users
export const updateUsers=(id,formData,token)=>{
    return fetch(`${API_USER}/updateuser/${id}`,{
        method:"PUT",
        headers:{
            "Authorization":`Bearer ${token}`

        },
        body:formData
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}


// logout
export const logout=()=>{
    localStorage.removeItem("jwt")
    return fetch(`${API_USER}/logout`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}