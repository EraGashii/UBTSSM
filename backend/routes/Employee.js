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

// PUT /employee/update/:id - Update an existing employee
router.put('/update/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
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
      role,
    } = req.body;

    // Find the employee by ID
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    // Update the employee data
    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.employeeID = employeeID || employee.employeeID;
    employee.dateOfBirth = dateOfBirth || employee.dateOfBirth;
    employee.gender = gender || employee.gender;
    employee.maritalStatus = maritalStatus || employee.maritalStatus;
    employee.designation = designation || employee.designation;
    employee.department = department || employee.department;
    employee.salary = salary || employee.salary;
    employee.role = role || employee.role;

    // If an image is provided, update the image
    if (req.file) {
      employee.image = `/uploads/${req.file.filename}`;
    }

    // Save the updated employee document
    const updatedEmployee = await employee.save();

    res.status(200).json({ success: true, message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {
    console.error('Error updating employee:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

export default router;
