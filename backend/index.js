import express from 'express'
import dotenv from 'dotenv'
import DBCon from './utils/db.js'
import AuthRouters from './routes/Auths.js';
dotenv.config()
const PORT = process.env.PORT || 3000;
const app=express()

//mongo connection

DBCon()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello from baceknd")
})
app.use('/auth',AuthRouters)

app.listen(PORT,()=>{
    console.log(`appp is running on  Port ${PORT}`)
})

