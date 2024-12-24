// duhet me u fshii
// import express from 'express';

// const router = express.Router();

// // Simulated in-memory database for users
// let users = [
//   { id: 1, name: 'John Doe', email: 'john@example.com' },
//   { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
// ];

// // Route to get users
// router.get('/', (req, res) => {
//   res.json(users);
// });

// // Route to create a new user
// router.post('/', (req, res) => {
//   const { name, email } = req.body;

//   if (!name || !email) {
//     return res.status(400).json({ message: 'Name and email are required' });
//   }

//   const newUser = {
//     id: users.length + 1,
//     name,
//     email,
//   };

//   users.push(newUser);
//   res.status(201).json({ message: 'User created successfully', user: newUser });
// });

// // Route to delete a user by ID
// router.delete('/:id', (req, res) => {
//   const userId = parseInt(req.params.id);

//   users = users.filter(user => user.id !== userId);

//   res.status(200).json({ message: 'User deleted successfully' });
// });

// export default router;
import express from 'express';
import User from '../models/user.js';
import multer from 'multer';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Add timestamp to filename
  },
});

const upload = multer({ storage });

// GET /user - Fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// POST /user/add - Add a new user
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      email,
      userID,
      dateOfBirth,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    // Validate required fields
    if (!name || !email || !userID || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Create new user document
    const newUser = new User({
      name,
      email,
      userID,
      dateOfBirth,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password, // Ensure to hash the password before saving
      role,
      image: req.file ? `/uploads/${req.file.filename}` : null, // Save file path
    });

    const savedUser = await newUser.save();

    res.status(201).json({ success: true, message: 'User added successfully', user: savedUser });
  } catch (error) {
    console.error('Error saving user:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// PUT /user/update/:id - Update an existing user
router.put('/update/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      userID,
      dateOfBirth,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      role,
    } = req.body;

    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update the user data
    user.name = name || user.name;
    user.email = email || user.email;
    user.userID = userID || user.userID;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.gender = gender || user.gender;
    user.maritalStatus = maritalStatus || user.maritalStatus;
    user.designation = designation || user.designation;
    user.department = department || user.department;
    user.salary = salary || user.salary;
    user.role = role || user.role;

    // If an image is provided, update the image
    if (req.file) {
      user.image = `/uploads/${req.file.filename}`;
    }

    // Save the updated user document
    const updatedUser = await user.save();

    res.status(200).json({ success: true, message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

export default router;
