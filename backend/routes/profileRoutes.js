import express from 'express';
import {updateProfile}  from '../controllers/profileController.js'; // Import the controller
import upload from '../middleware/multer.js';

const router = express.Router();

// Route to update the user profile
router.post('/update', upload.single('profileImage'), updateProfile);


export default router;