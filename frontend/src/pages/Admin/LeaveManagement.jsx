import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function LeaveManagement({ employeeID, onBack }) {
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    status: 'Pending',
    reason: '',
  });

  useEffect(() => {
    fetchLeaves();
  }, [employeeID]);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/leave?employeeID=${employeeID}`
      );
      setLeaves(response.data.data);
    } catch (error) {
    //   toast.error('Failed to load leave records');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/leave/submit', {
        ...formData,
        employeeID,
      });
      toast.success('Leave request added');
      fetchLeaves();
    } catch (error) {
      toast.error('Failed to submit leave');
    }
  };

  return (
    <div className="container">
      <button className="btn btn-secondary mb-3" onClick={onBack}>
        Back to Employees
      </button>
      <h3>Leave Management for Employee ID: {employeeID}</h3>

      <form onSubmit={handleSubmit} className="card p-4">
        <select
          name="leaveType"
          value={formData.leaveType}
          className="form-control mb-2"
          onChange={handleChange}
        >
          <option value="">Select Leave Type</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Casual Leave">Casual Leave</option>
        </select>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          className="form-control mb-2"
          onChange={handleChange}
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          className="form-control mb-2"
          onChange={handleChange}
        />
        <textarea
          name="reason"
          placeholder="Reason"
          value={formData.reason}
          className="form-control mb-2"
          onChange={handleChange}
        />
        <button className="btn btn-primary" type="submit">
          Submit Leave Request
        </button>
      </form>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
