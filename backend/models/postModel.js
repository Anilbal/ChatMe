const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema
const postSchema=new mongoose.Schema({
    user:{
        type:ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    video:{
        type:String,
        // required:true
    },
    like:{
        type:Array
    },
    dislike:{
        type:Array

    },
    comments:[
        {
            user:{
                type:ObjectId,
                required:true
            },
            username:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            },
            profile:{
                type:String,
            }
        }
    ]
})

module.exports=mongoose.model("Post",postSchema)
