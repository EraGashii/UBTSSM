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
    console.error(err);
    res.status(500).json({ message: 'Server error while submitting leave' });
  }
});

// Get leave records for a specific employee
LeaveRoutes.get('/:userID', async (req, res) => {
  try {
    const { userID } = req.params;

    const leaves = await Leave.find({ userID });
    res.status(200).json({ leaves });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch leave records' });
  }
});

export default LeaveRoutes

  