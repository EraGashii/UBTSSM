import express from 'express';
import { getUserProfile, updateProfile } from '../controllers/profileController.js'; // Import the controller
import upload from '../middleware/multer.js';
import { isUserRole } from '../middleware/isUserRole.js';

const router = express.Router();

// GET route to fetch the user profile
router.get('/', isUserRole, getUserProfile); // Add this route

// POST route to update the user profile
router.post('/update', isUserRole, upload.single('profileImage'), updateProfile);

export default router;
