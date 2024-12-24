import express from 'express';
import { isLogin } from '../middleware/isAdmin.js'; // Import login middleware
import User from '../models/user.js'; // Import user model

const router = express.Router();

// Route to get the logged-in user's profile
router.get('/me', isLogin, async (req, res) => {
  try {
    // Assuming req.user contains the user ID from authentication
    const userId = req.user._id; // Typically set by the isLogin middleware after authentication

    const user = await User.findById(userId); // Fetch user data from the database by ID

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send user details in the response
    res.json({
      name: user.FullName || 'N/A',
      email: user.email || 'N/A',
      employeeID: user.employeeID || 'N/A',
      dateOfBirth: user.dateOfBirth || 'N/A',
      department: user.department || 'N/A',
      image: user.profileImage || '/default-avatar.png', // Use default image if not set
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
