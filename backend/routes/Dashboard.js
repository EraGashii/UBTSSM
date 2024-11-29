import express from 'express'
import { isAdmin } from '../middleware/isAdmin.js'
import { Getalldate, GetUser, Userdelete } from '../controllers/Dashboard.js'

const DahbaordRoutes=express.Router()

DahbaordRoutes.get('/',isAdmin,Getalldate)
DahbaordRoutes.get('/users',isAdmin,GetUser)
DahbaordRoutes.delete('/deleteuser/:id',isAdmin,Userdelete)

export default DahbaordRoutes