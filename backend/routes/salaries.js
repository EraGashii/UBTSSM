// routes/salaries.js
import express from 'express';
import Salary from '../models/Salary.js'; // Import the Salary model

const SalariesRoutes = express.Router();

// POST route to add a salary
SalariesRoutes.post('/', async (req, res) => {
  try {
    const { userID, department, employee, basicSalary, allowances, deductions, payDate } = req.body;

    // Create a new salary entry
    const salary = new Salary({
      userID,
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

  // GET route to fetch salary by employee ID
// GET route to fetch salary by userID
SalariesRoutes.get('/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const salary = await Salary.findOne({ employee: userID }); // Assuming 'employee' is a reference to the userID

    if (!salary) {
      return res.status(404).json({ message: 'Salary not found' });
    }

    res.status(200).json(salary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching salary', error });
  }
});


// PUT route to update salary
SalariesRoutes.put('/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const updates = req.body;

    // Find and update the salary
    const salary = await Salary.findOneAndUpdate(
      { employee: userID },
      { $set: updates },
      { new: true }
    );

    if (!salary) {
      return res.status(404).json({ message: 'Salary not found' });
    }

    res.status(200).json({
      message: 'Salary updated successfully!',
      salaryData: salary,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating salary', error });
  }
});


export default SalariesRoutes;
