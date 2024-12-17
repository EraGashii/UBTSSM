import UserModel from '../models/user.js'; // Assuming you have a User model
// import bcrypt from 'bcrypt';
import bcrypt from 'bcryptjs';
//const path = require('path');

// Function to update the profile
export const updateProfile = async (req, res) => {
  const { name, oldPassword, newPassword } = req.body;
  const profileImage = req.file; // Multer stores uploaded file in req.file

  try {
    // Get the current user from the request (assuming authentication middleware)
    const user = await UserModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the old password matches (if provided)
    if (oldPassword && !bcrypt.compareSync(oldPassword, user.password)) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    // Prepare update data
    const updateData = {};

    if (name) {
      updateData.name = name; // Update name if provided
    }

    if (newPassword) {
      // If a new password is provided, hash it before saving
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      updateData.password = hashedPassword;
    }

    if (profileImage) {
      // If a profile image is uploaded, store the path in the database
      updateData.profileImagePath = profileImage.path;
    }

    // Update the user in the database
    const updatedUser = await UserModel.findByIdAndUpdate(req.user._id, updateData, {
      new: true, // Return the updated user object
    });

    // Respond with the updated user data (excluding password for security reasons)
    res.status(200).json({
      message: 'Profile updated successfully!',
      user: {
        name: updatedUser.name,
        profileImagePath: updatedUser.profileImagePath,
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'An error occurred while updating the profile' });
  }
};
