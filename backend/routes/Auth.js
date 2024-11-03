import express from 'express'
import {Register} from '../controllers/Auth.js'
import upload from '../middleware/multer.js'

const AuthRouters=express.Router()

AuthRouters.post('/register', upload.single('profile'),Register)


export default AuthRouters  