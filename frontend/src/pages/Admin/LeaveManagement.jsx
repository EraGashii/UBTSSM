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
      console.error('Failed to fetch leave records');
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
      setFormData({
        leaveType: '',
        startDate: '',
        endDate: '',
        status: 'Pending',
        reason: '',
      });
    } catch (error) {
      toast.error('Failed to submit leave');
    }
  };

  return (
    <div className="container my-4" style={{ maxWidth: '900px' }}>
      {/* Back Button */}
      <button className="btn btn-outline-secondary mb-3" onClick={onBack}>
        <i className="bi bi-arrow-left"></i> Back to Employees
      </button>

      {/* Header */}
      <h3 className="mb-4 text-primary">Leave Management</h3>
      <p className="text-muted">
        Managing leave requests for Employee ID: <strong>{employeeID}</strong>
      </p>

      {/* Leave Request Form */}
      <form onSubmit={handleSubmit} className="card p-4 mb-4 shadow-sm">
        <div className="mb-3">
          <input
            type="text"
            name="leaveType"
            value={formData.leaveType}
            placeholder="Leave Type"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            name="reason"
            placeholder="Reason"
            value={formData.reason}
            className="form-control"
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit Leave Request
        </button>
      </form>

      {/* Styled Leave Records List */}
      <div
        className="table-responsive card p-4 shadow-sm"
        style={{ width: '100%' }}
      >
        <table className="table text-center align-middle mb-0" style={{ width: '100%' }}>
          <thead className="table-light">
            <tr>
              <th style={{ width: '5%' }}>#</th>
              <th style={{ width: '20%' }}>Leave Type</th>
              <th style={{ width: '20%' }}>Start Date</th>
              <th style={{ width: '20%' }}>End Date</th>
              <th style={{ width: '15%' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      value={leave.leaveType}
                      readOnly
                      className="form-control border-0 bg-transparent text-center"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={leave.startDate}
                      readOnly
                      className="form-control border-0 bg-transparent text-center"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={leave.endDate}
                      readOnly
                      className="form-control border-0 bg-transparent text-center"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={leave.status}
                      readOnly
                      className="form-control border-0 bg-transparent text-center"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-muted py-4">
                  No leave records available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
