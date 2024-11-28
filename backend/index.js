import express from 'express'
import dotenv from 'dotenv'
import DBCon from './utils/db.js'
import AuthRouters from './routes/Auth.js';
import cookieParser from 'cookie-parser'
import BlogsRouters from './routes/Blog.js';
dotenv.config()
const PORT = process.env.PORT || 3000;
const app=express()

//mongo connection

DBCon()
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hello from baceknd")
})
app.use('/auth',AuthRouters)
app.use('/Blog',BlogsRouters)

app.listen(PORT,()=>{
    console.log(`appp is running on  Port ${PORT}`)
})

