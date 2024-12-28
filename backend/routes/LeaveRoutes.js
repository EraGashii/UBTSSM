import express from 'express'
import Leave from '../models/Leave.js';

const LeaveRoutes = express.Router();

// Submit a new leave request
LeaveRoutes.post('/', async (req, res) => {
  try {
    const { userID, startDate, endDate, reason } = req.body;
    if (!userID || !startDate || !endDate || !reason) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newLeave = new Leave({ userID, startDate, endDate, reason });
    await newLeave.save();
    res.status(201).json({ message: 'Leave submitted successfully', leave: newLeave });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting leave', error: err });
  }
});

// Get leave records for a specific employee
LeaveRoutes.get('/leaves/:userID', async (req, res) => {
  console.log('User ID:', req.params.userID);  // Debugging line
  try {
    const leaves = await Leave.find({ userID: req.params.userID });
    if (!leaves) {
      return res.status(404).json({ message: 'No leave records found' });
    }
    res.json(leaves);
  } catch (error) {
    console.error('Error fetching leave records:', error);  // Debugging line
    res.status(500).json({ message: 'Failed to fetch leave records', error });
  }
});


export default LeaveRoutes