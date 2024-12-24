// import express from 'express';
// import { isLogin } from '../middleware/isAdmin.js'; // Import login middleware
// import Employee from '../models/Employee.js'


// const router = express.Router();

// // Route to get the logged-in user's profile
// router.get('/me', isLogin, async (req, res) => {
//   try {
//     const user = req.user; // `req.user` is attached by the isLogin middleware

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Return user details
//     res.json({
//       name: user.name,
//       email: user.email,
//       employeeID: user.employeeID,
//       dateOfBirth: user.dateOfBirth,
//       department: user.department,
//       image: user.profileImage, // Assuming the user schema includes this field
//     });
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// export default router;
