// routes/salaries.js
import express from 'express';
import Salary from '../models/Salary.js'; // Import the Salary model

const SalariesRoutes = express.Router();

// POST route to add a salary
SalariesRoutes.put("/updateSalary/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { salary } = req.body;  // Make sure the request body contains the salary field
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },  // Search by the user ID
      { salary },    // Update only the salary field
      { new: true }  // Return the updated user object
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Salary updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
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
SalariesRoutes.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { salary, bonus } = req.body; // Assume you're adding a bonus

    if (salary && isNaN(salary)) {
      return res.status(400).json({ success: false, message: 'Invalid salary value' });
    }

    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update salary and optionally calculate new values with bonus
    if (salary) user.salary = salary;
    if (bonus) user.salary += bonus; // Example: Add a bonus to the salary

    // Save the updated user document
    const updatedUser = await user.save();

    res.status(200).json({ success: true, message: 'Salary updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating salary:', error.message);
    res.status(500).json({ success: false, message: 'Failed to update salary details' });
  }
});



export default SalariesRoutes;
