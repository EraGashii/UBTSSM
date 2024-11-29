import express from 'express'
import AddComment from '../controllers/Comment.js'
import { isLogin } from '../middleware/isAdmin.js'
const CommentsRouters=express.Router()

CommentsRouters.post('/addcomment',isLogin,AddComment)

export default CommentsRouters