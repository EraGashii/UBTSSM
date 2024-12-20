    import express from 'express';
    import { isLogin } from '../middleware/isAdmin.js'; // Import login middleware
    import UserModel from '../models/user.js'; // Import user model

    const router = express.Router();

    // Route to get the logged-in user's profile
    router.get('/me', isLogin, async (req, res) => {
        try {
          const user = req.user; // This should be the user fetched by isLogin middleware
          console.log('User object in /me route:', user); // Log to check the user object
      
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          res.json({
            name: user.FullName || 'N/A',
            email: user.email || 'N/A',
            employeeID: user.employeeID || 'N/A',
            dateOfBirth: user.dateOfBirth || 'N/A',
            department: user.department || 'N/A',
            image: user.profileImage || '/default-avatar.png',
          });
        } catch (error) {
          console.error('Error fetching user profile:', error);
          res.status(500).json({ message: 'Server error' });
        }
      });
      

    export default router;
