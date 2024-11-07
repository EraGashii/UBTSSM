import express from 'express'
import {Register, Login } from '../controllers/Auth.js'
import upload from '../middleware/multer.js'

const AuthRouters=express.Router()

AuthRouters.post('/register', upload.single('profile'),Register)
AuthRouters.post("/login",Login)


export default AuthRouters  