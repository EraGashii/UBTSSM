import User from '../models/user.js'; // Assuming you have a User model
import bcrypt from 'bcryptjs'; // For password hashing

// Controller to fetch user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userID; // Assuming `isUserRole` middleware sets `req.user`
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      userID: user.userID,
      dateOfBirth: user.dateOfBirth,
      department: user.department,
      image: user.profileImage || '/default-avatar.png',
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to update the user profile
export const updateProfile = async (req, res) => {
  const { name, oldPassword, newPassword } = req.body;
  const profileImage = req.file; // Multer stores uploaded file in req.file

  try {
    const user = await User.findById(req.user.userID);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify old password if provided
    if (oldPassword && !bcrypt.compareSync(oldPassword, user.password)) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    // Prepare update data
    const updateData = {};

    if (name) {
      updateData.name = name; // Update name if provided
    }

    if (newPassword) {
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      updateData.password = hashedPassword;
    }

    if (profileImage) {
      updateData.profileImage = profileImage.path; // Update profile image path
    }

    // Update user in the database
    const updatedUser = await User.findByIdAndUpdate(req.user.userID, updateData, {
      new: true, // Return the updated user object
    });

    res.status(200).json({
      message: 'Profile updated successfully!',
      user: {
        name: updatedUser.name,
        profileImage: updatedUser.profileImage || '/default-avatar.png',
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'An error occurred while updating the profile' });
  }
};
