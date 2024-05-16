const express=require('express')
const { register, verifyEmail, login, deleteUser, updateUser, getAllUser, followUser, requireLogin, getPostFromFollowers, getUserById, getNoFollowUserList, notuserFriends, getFollowingUserList, getFollowersUserList, signOut } = require('../controller/userController')
const upload = require('../Config/fileUploads')
const { userCheck, validate } = require('../Config/validation')
const { accessJwt } = require('../Config/authentication')
const router=express.Router()

// creating new user
router.post('/register',userCheck,validate,upload.single('profile'),register)
// verify email
router.get('/emailverify/:token',verifyEmail)
// user login
router.post('/login',login)
// logout
router.get('/logout',signOut)
// get all user
router.get('/alluser',getAllUser)
// get user by id
router.get('/singleuser/:id',getUserById)
// delete user
router.delete("/deleteuser/:id",accessJwt,deleteUser)
// delete user
router.put("/updateuser/:id",accessJwt,upload.single('profile'),updateUser)
// follow user
router.put('/followinguser/:id',accessJwt,followUser)
// getting post from followers
router.get('/followerpost/:id',getPostFromFollowers)
// list of new user to follow
router.get('/newfriends',accessJwt,getNoFollowUserList)
// get list of follwing user
router.get('/followinguserlists/:id',accessJwt,getFollowingUserList)
// get list of followers user
router.get('/followersuserlists/:id',accessJwt,getFollowersUserList)

module.exports=router