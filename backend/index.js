import express from 'express'
import dotenv from 'dotenv'
import DBCon from './utils/db.js'
import AuthRouters from './routes/Auth.js';
import cookieParser from 'cookie-parser'
import BlogsRouters from './routes/Blog.js';
import DahbaordRoutes from './routes/Dashboard.js';
import CommentsRouters from './routes/Comments.js';
import PublicRoutes from './routes/Public.js';
import fs from 'fs';
import path from 'path';
dotenv.config()
const PORT = process.env.PORT || 3000;
const app=express()

const uploadPath = path.resolve('uploads/');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
  console.log('uploads/ directory created successfully.');
} else {
  console.log('uploads/ directory already exists.');
}
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
app.use('/dahbaord',DahbaordRoutes)
app.use('/comment',CommentsRouters)
app.use('/public',PublicRoutes)

app.listen(PORT,()=>{
    console.log(`appp is running on  Port ${PORT}`)
})

