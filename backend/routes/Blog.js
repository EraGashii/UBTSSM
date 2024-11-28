import express from 'express'
import { Create } from '../controllers/Blog.js'
import { isAdmin } from '../middleware/isAdmin.js'

const BlogsRouters=express.Router()
BlogsRouters.post('/create',isAdmin,Create)

export default BlogsRouters