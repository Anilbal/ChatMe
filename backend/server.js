const express=require('express')
require('dotenv').config()
require('./Config/mongoDB')
const cors=require('cors')
const app=express()

const port=process.env.PORT || 8000
const userRoute=require('./routes/userRoutes')
const postRoute=require('./routes/postRoutes')


app.use(cors())
app.use(express.json())
app.use(userRoute)
app.use(postRoute)
app.use("/public/uploads",express.static('public/uploads'))

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})

