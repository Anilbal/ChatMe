const express=require('express')
const { requireLogin } = require('../controller/userController')
const { createPost, getPostByUserId, updatePost, commentsPOst, likePost, dislikePost, deletePost, getPostByUser, singleUserPost } = require('../controller/postController')
const upload = require('../Config/fileUploads')
const { accessJwt } = require('../Config/authentication')

const router=express.Router()

// creating new post
router.post('/newpost',accessJwt,upload.single('image'),createPost)
// get post by user
router.get('/getpostbyuser',accessJwt,getPostByUserId)
router.get('/getpostbyuserid/:id',accessJwt,getPostByUser)
router.get('/singleuserpost/:id',singleUserPost)


// update post
router.put('/updatepost/:id',accessJwt,upload.single('image'),updatePost)
// like the post
router.delete('/deletepost/:id',accessJwt,deletePost)
// coments on post
router.put('/comment/:postId',accessJwt,commentsPOst)
// like the post
router.put('/like/:id',accessJwt,likePost)
// dislike the post
router.put('/dislike/:id',accessJwt,dislikePost)


module.exports=router