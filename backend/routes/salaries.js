// routes/salaries.js
import express from 'express';
import Salary from '../models/Salary.js'; // Import the Salary model

const SalariesRoutes = express.Router();

// POST route to add a salary
SalariesRoutes.post('/', async (req, res) => {
  try {
    const { department, employee, basicSalary, allowances, deductions, payDate } = req.body;

    // Create a new salary entry
    const salary = new Salary({
      department,
      employee,
      basicSalary,
      allowances,
      deductions,
      payDate,
    });

    // Save the salary to the database
    await salary.save();

    // Send a response back to the client
    res.status(201).json({
      message: 'Salary added successfully!',
      salaryData: salary,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding salary', error });
  }
});

export default SalariesRoutes;
