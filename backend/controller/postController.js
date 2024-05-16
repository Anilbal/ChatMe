const Post=require('../models/postModel')
// const userModel = require('../models/userModel')
const User=require('../models/userModel')



// create new post
exports.createPost=async(req,res)=>{

    let post=await Post.create({
        user:req.user.user,
        title:req.body.title,
        image:req.file?.path,
        video:req.body.video
    })
    if(!post){
        return res.status(400).json({error:"Error occured"})
    }
    res.send(post)
}

// get my post by login user
exports.getPostByUserId=async(req,res)=>{
    let post=await Post.find({user:req.user.user})
    if(!post){
        return res.status(400).json({error:"No post yet!!"})
    }
    res.send(post)
}

exports.singleUserPost=async(req,res)=>{
    let post=await Post.find({user:req.params.id})
    if(!post){
        return res.status(400).json({error:"No post yet!!"})
    }
    res.send(post)
}
// get my post by user id
exports.getPostByUser=async(req,res)=>{
    let post=await Post.find({user:req.params.id})
    if(!post){
        return res.status(400).json({error:"No post yet!!"})
    }

    let totalPost=post.length

    let totalLikesPerPost=post.map(likes=>{
        const individualLike=likes.like.length
        return individualLike
    }) 

    let mainTotalLikes=totalLikesPerPost.reduce((acc,cur)=>acc+cur,0)
    res.send({post,mainTotalLikes,totalPost})
}
// updatig post
exports.updatePost=async(req,res)=>{
    let post=await Post.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        image:req.file?.path,
        video:req.body.video
    },{new:true})
    if(!post){
        return res.status(400).json({error:"No post yet!!"})
    }
    res.send(post)
}

// deleting post
exports.deletePost=async(req,res)=>{
    let post=await Post.findByIdAndDelete(req.params.id)
    if(!post){
        return res.status(400).json({error:"No post yet!!"})
    }
    res.send({message:"Post has been deleted"})
}


// like the post
exports.likePost=async(req,res)=>{

    // finding post to be liked at first
    let post=await Post.findById(req.params.id)

    // if there is no like in the  post then
    if(!post.like.includes(req.user.user)){
        if(post.dislike.includes(req.user.user)){
            await post.updateOne({$pull:{dislike:req.user.user}})
        }
        await post.updateOne({$push:{like:req.user.user}})
        return res.status(200).json({message:"Post has been liked"})
    }else{
        await post.updateOne({$pull:{like:req.user.user}})
        return res.status(200).json({message:"Post has been unliked"})
    }
}


// dislike the post
exports.dislikePost=async(req,res)=>{

    // finding post to be liked at first
    let post=await Post.findById(req.params.id)

    // if there is no like in the  post then
    if(!post.dislike.includes(req.user.user)){
        if(post.like.includes(req.user.user)){
            await post.updateOne({$pull:{like:req.user.user}})
        }
        await post.updateOne({$push:{dislike:req.user.user}})
        return res.status(200).json({message:"Post has been disliked"})
    }else{
        await post.updateOne({$pull:{dislike:req.user.user}})
        return res.status(200).json({message:"Post has been undisliked"})
    }
}

// comments
exports.commentsPOst=async(req,res)=>{
    const {comment}=req.body
    let comments={
        user:req.user.user,
        username:req.user.username,
        comment:comment,
        profile:req.user.profile
    }

    const post=await Post.findById(req.params.postId)
    post.comments.push(comments)
    await post.save()
    if(!post){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(post)
}

// // delete comment
// exports.deleteComment=async(req,res)=>{
//     const post=await Post.findById(req.params.postId)
//     post.comments.pull(comments)
//     await post.save()
//     if(!post){
//         return res.status(400).json({error:"Something went wrong"})
//     }
//     res.send(post)
// }


