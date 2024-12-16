import express from 'express';
import Employee from '../models/Employee.js';
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

// GET /employee - Fetch all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    console.error('Error fetching employees:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// POST /employee/add - Add a new employee
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const {
      name,
      email,
      employeeID,
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
    if (!name || !email || !employeeID || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Create new employee document
    const newEmployee = new Employee({
      name,
      email,
      employeeID,
      dateOfBirth,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
      image: req.file ? `/uploads/${req.file.filename}` : null, // Save file path
    });

    const savedEmployee = await newEmployee.save();

    res.status(201).json({ success: true, message: 'Employee added successfully', employee: savedEmployee });
  } catch (error) {
    console.error('Error saving employee:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

export default router;
