import express from 'express';
import Department from '../models/Department.js';

const router = express.Router();

// Add a new department
router.post('/add', async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Department name is required' });
    }

    const newDepartment = new Department({ name, description });
    const savedDepartment = await newDepartment.save();

    res.status(201).json({ success: true, message: 'Department added successfully', data: savedDepartment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// Get all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json({ success: true, data: departments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// Delete a department
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Department.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// Update a department
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedDepartment = await Department.findByIdAndUpdate(id, { name, description }, { new: true });

    res.status(200).json({ success: true, message: 'Department updated successfully', data: updatedDepartment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

export default router;
