import express from 'express'
import { GetSinelpost } from '../controllers/public.js'

const PublicRoutes=express.Router()

PublicRoutes.get('/singlepost/:id',GetSinelpost)

export default PublicRoutes