const mongoose=require('mongoose')
const crypto=require('crypto')
const uuidv1=require('uuidv1')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    occupation:{
        type:String,
    },
    bio:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    hashed_password:{
        type:String,
        required:true
    },
    profile:{
        type:String,
    },
    followers:[
        {
            type:String
        }
    ],
    following:[
        {
            type:String
        }
    ],
    isVerified:{
        type:Boolean,
        default:false
    },
    salt:String,
})

userSchema.virtual("password")
.set(function(password){
    this._password=password
    this.salt=uuidv1()
    this.hashed_password=this.encrypt(this._password)
})
 userSchema.methods={
    encrypt:function(password){
     if (password==""){
        return null
     }
     try{
        return crypto.createHmac("sha256",this.salt).update(password).digest("hex")
     }
     catch{
        return null
        }
    },
    authenticate:function(password){
        return this.hashed_password==this.encrypt(password)
    }
}


module.exports=mongoose.model("User",userSchema)