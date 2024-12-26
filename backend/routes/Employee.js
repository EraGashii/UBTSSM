import express from 'express';
import authenticateToken from '../middleware/authenticateToken.js'; // Import the middleware for token validation
import EmployeeModel from '../models/employee.js'; // Import your employee model

const router = express.Router();

// Route to get employee details after token validation
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const employeeId = req.user.userId; // Extract employeeId from the decoded token
    const employee = await EmployeeModel.findById(employeeId); // Find the employee by ID

    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    res.status(200).json({ success: true, employee }); // Send the employee data as response
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
