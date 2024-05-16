const User=require('../models/userModel')
const Token=require('../models/tokenModel')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')
const sendEmail = require('../Config/sendMail')
const {expressjwt}=require("express-jwt")
const Post=require('../models/postModel')
// !user register 
exports.register=async(req,res)=>{
    // check if user exists or not
    let userExists=await User.findOne({email:req.body.email})

    // if user already exist then
    if(userExists){
        return res.status(400).json({error:"User already registered"})
    }

    // && check if username already exist or not
    let usernameExists=await User.findOne({username:req.body.username})

    // if user already exist then
    if(usernameExists){
        return res.status(400).json({error:"Username not available"})
    }

    // if user is not registerd then
    let newUser=await User.create({
        username:req.body.username,
        occupation:req.body.occupation,
        bio:req.body.bio,
        email:req.body.email,
        password:req.body.password,
        profile:req.file?.path
    })
    if(!newUser){
        return res.status(400).json({error:"User not registered"})
    }

    let token=await Token.create({
        token:crypto.randomBytes(16).toString('hex'),
        user:newUser._id
    })

    if(!token){
        return res.status(400).json({error:"token not generated"})
    }

    const url=`http://localhost:5000/emailverify/${token.token}`

    sendEmail({
        from:"noreply@something.com",
        to:req.body.email,
        subject:"Verify your email",
        text:"Click TO verify"+url,
        html:`<a href="${url}"><button>CLick here</button></a>`
    })

    res.send({message:"Verify Link has been sent to your mail"})
}

// !verify email or user
exports.verifyEmail=async(req,res)=>{
    // check if token is availble or not
    let token=await Token.findOne({token:req.params.token})

    // if there is not token
    if(!token){
        return res.status(400).json({error:"Invalid token"})
    }

    // check token is for related user ot not
    let user=await User.findById(token.user)

    if(!user){
        return res.status(400).json({error:"User not found"})
    }

    // checking if user already verified or not
    if(user.isVerified){
        return res.status(400).json({error:"User already verified"})
    }

    user.isVerified=true
    user=await user.save()
    if(!user){
        return res.status(400).json({error:"User not found"})
    }
    res.send({message:"User verified successfully"})
}

// login user

exports.login=async(req,res)=>{
    let {email,password}=req.body
    // check if email is registered
    let user=await User.findOne({email:email})
    if(!user){
        return res.status(400).json({error:"User not registered"})
    }
    // check if passowrd is registered or not
    if(!user.authenticate(password)){
        return res.status(400).json({error:"Email and password doesnt match"})
    }
    // check if user is verified or not
    if(!user.isVerified){
        return res.status(400).json({error:"Your account is not verified yet"})
    }
    // generate login token from jsonwebtoken to authenticate
 let token=jwt.sign({
        user:user._id,
        email:user.email,
        username:user.username,
        profile:user.profile,
        occupation:user.occupation,
        bio:user.bio
     },process.env.SECRET_KEY)
     if(!token){
        return res.status(400).json({error:"Something went wrong"})
     }

    //  set info in cookie
     res.cookie("myCookie",token,{expire:Date.now()+86400})

    // sent info to frontend 
    const {_id,role,username,profile,occupation,bio}=user
    res.send({token:token,user:{_id,role,email,username,profile,occupation,bio}})
}


// Authorization

exports.requireLogin=expressjwt({
    algorithms:["HS256"],
    secret:process.env.SECRET_KEY
})

// signout
exports.signOut=async(req,res)=>{
    let response= await res.clearCookie('myCookie')
    if(!response){
     return res.status(400).json({error:"Somthing went wrong"})
    }
     res.send({message:"Signout Successfully"})
 }
 

// get all user
exports.getAllUser=async(req,res)=>{
    let user=await User.find()
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(user)
}

// get user by id
exports.getUserById=async(req,res)=>{
    let user=await User.findById(req.params.id)
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(user)
}

// delete user
exports.deleteUser=async(req,res)=>{
    if(req.params.id===req.user.user){
    let user=await User.findByIdAndDelete(req.params.id)
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send({message:"User deleted successfully"})
}else{
    return res.status(400).json({error:"you are not allowed to delete account"})
}
}

// update user
exports.updateUser=async(req,res)=>{
    if(req.params.id===req.user.user){
        let user=await User.findByIdAndUpdate(req.params.id,{
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            profile:req.file?.path,
            occupation:req.body.occupation,
            bio:req.body.bio
        },{new:true})
        if(!user){
            return res.status(400).json({error:"Something went wrong"})
        }
        res.send(user)
    }else{
        return res.status(400).json({error:"You are not allow to update this account!!"})
    }
}



// following new  users
exports.followUser=async(req,res)=>{
    if(req.params.id!==req.user.user){
        const user=await User.findById(req.params.id)
        const otherUser=await User.findById(req.user.user)

        if(!user.followers.includes(req.user.user)){
            await user.updateOne({$push:{followers:req.user.user}})
            await otherUser.updateOne({$push:{following:req.params.id}})
            return res.status(200).json({message:"You followed"})
        }else{
            return res.status(400).json({error:"You already followed"})
        }
    }else{
        return res.status(400).json({error:"You cant follow yourself"})
    }
}

// getting post from followers
exports.getPostFromFollowers=async(req,res)=>{
    let user=await User.findById(req.params.id)
    const followerPost=await Promise.all(
        user.following.map((item)=>{
            return Post.find({user:item})
        })
    )
    if(!followerPost){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(followerPost)
}


// get list of user you havent followed
exports.getNoFollowUserList=async(req,res)=>{
    let allUser=await User.find({ _id: { $ne: req.user.user } })
    const user=await User.findById(req.user.user)
    const followingUser=await Promise.all(
        user.following.map((item)=>{
            return item
        })
    )

    let newUserToFollow=allUser.filter((val)=>{
        return !followingUser.find((item)=>{
            return val._id.toString()===item
        })
    })

    let filterUser=await Promise.all(
        newUserToFollow.map((item)=>{
            const {email,occupation,bio,hashed_password,followers,following,salt,isVerified, ...other}=item._doc
            return other
        })
    )
    res.send(filterUser)
}


// get list of  users follwed by you
exports.getFollowingUserList=async(req,res)=>{
    const user=await User.findById(req.params.id)
    const followingUsers=await Promise.all(
        user.following.map((item)=>{
            return User.findById(item)
        })
    )

    let followingUserList=[]
    followingUsers.map((person)=>{
        const {email,occupation,hashed_password,followers,salt,isVerified, ...other}=person._doc
            return followingUserList.push(other)
    })
    res.send(followingUserList)
}

// get list of user who follwed you
exports.getFollowersUserList=async(req,res)=>{
    const user=await User.findById(req.params.id)
    const followersUsers=await Promise.all(
        user.followers.map((item)=>{
            return User.findById(item)
        })
    )

    let followerUserList=[]
    followersUsers.map((person)=>{
        const {email,occupation,bio,hashed_password,followers,following,salt,isVerified, ...other}=person._doc
            return followerUserList.push(other)
    })
    res.send(followerUserList)
}