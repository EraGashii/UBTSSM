import express from 'express'
import { isAdmin } from '../middleware/isAdmin.js'
import upload from '../middleware/multer.js';
import { Create, deletePost, getposts,update } from '../controllers/Blog.js';

const BlogsRouters=express.Router()
BlogsRouters.post('/create',isAdmin,upload.single('postimage'),Create)
BlogsRouters.delete('/delete/:id',isAdmin,deletePost)
BlogsRouters.get('/getposts',getposts)
BlogsRouters.patch('/update/:id',isAdmin,upload.single('postimage'),update)


export default BlogsRouters