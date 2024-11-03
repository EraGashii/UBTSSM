import express from 'express'
import {Register} from '../controllers/Auth.js'

const AuthRouters=express.Router()

AuthRouters.post('/register',Register)

export default AuthRouters