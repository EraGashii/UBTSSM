import express from 'express';
import { updateProfile } from '../controllers/profileController.js'; // Import the controller
import upload from '../middleware/multer.js';
import { isUserRole } from '../middleware/isUserRole.js'; 

const router = express.Router();

// Route to update the user profile with both the role check and file upload
router.post('/update', isUserRole, upload.single('profileImage'), updateProfile);

export default router;
