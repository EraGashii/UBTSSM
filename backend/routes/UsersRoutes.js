import express from 'express';
import { isLogin } from '../middleware/isAdmin.js'; // Import login middleware
import User from '../models/user.js'; // Import user model

const router = express.Router();

// Route to get the logged-in user's profile
router.get('/', isLogin, async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // Assuming req.user is populated by isLogin middleware
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      name: user.name,
      email: user.email,
      userID: user.userID,
      dateOfBirth: user.dateOfBirth,
      department: user.department,
      image: user.profileImage || '/default-avatar.png',
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Error fetching user details' });
  }
});


export default router;
