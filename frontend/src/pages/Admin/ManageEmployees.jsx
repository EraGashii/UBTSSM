import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showLeaveManagement, setShowLeaveManagement] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showSalaryManager, setShowSalaryManager] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userID: '',
    dateOfBirth: '',
    department: '',
    image: null,
    password: '',
  });

  const [salaryData, setSalaryData] = useState({
    salary: '',
    bonus: '',
    deductions: '',
  });

  const [leaveData, setLeaveData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users');
      setUsers(response.data.data);
    } catch (error) {
      toast.error('Failed to load users');
    }
  };

  const fetchUserLeaves = async (userID) => {
    try {
      console.log(`Fetching leaves for user ID: ${userID}`); // Debugging line
      const response = await axios.get(`http://localhost:8000/leaves/${userID}`);
      console.log('Leave records fetched:', response.data);  // Debugging line
      setLeaveData(response.data);
    } catch (error) {
      toast.error('Failed to load leave records');
      console.error('Error fetching leave records:', error);  // Debugging line
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      if (selectedUser) {
        await axios.put(`http://localhost:8000/users/update/${selectedUser._id}`, data);
        toast.success('User updated successfully');
      } else {
        await axios.post('http://localhost:8000/users/add', data);
        toast.success('User added successfully');
      }

      fetchUsers();
      setShowForm(false);
      setSelectedUser(null);
    } catch (error) {
      toast.error('Failed to submit user');
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowForm(true);
    setFormData({
      name: user.name,
      email: user.email,
      userID: user.userID,
      dateOfBirth: user.dateOfBirth,
      department: user.department,
      image: null,
      password: '',
    });
  };

  const handleAction = (action, user) => {
    if (action === 'edit') {
      handleEdit(user);
    } else if (action === 'leave') {
      setSelectedUser(user);
      setShowLeaveManagement(true);
      fetchUserLeaves(user.userID);  // Fetch leave data for the selected user
    } else if (action === 'view') {
      setSelectedUser(user);
      setShowUserDetails(true);
    } else if (action === 'salary') {
      setSelectedUser(user);
      setShowSalaryManager(true);
    }
  };

  const handleSalaryChange = (e) => {
    const { name, value } = e.target;
    setSalaryData({ ...salaryData, [name]: value });
  };

  const handleSalarySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/salaries', { ...salaryData, userID: selectedUser.userID });
      toast.success('Salary details updated');
      setShowSalaryManager(false);
    } catch (error) {
      toast.error('Failed to update salary details');
    }
  };

  const handleLeaveChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({ ...leaveData, [name]: value });
  };
  
  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure that the userID is correctly attached to the leaveData
      const leaveDataWithUserID = { ...leaveData, userID: selectedUser.userID };
  
      // Post the leave data along with the userID
      await axios.post('http://localhost:8000/leave', leaveDataWithUserID);
      toast.success('Leave details updated');
      setShowLeaveManagement(false);
    } catch (error) {
      toast.error('Failed to update leave details');
    }
  };
  

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>Manage Users</h2>
        <button
          className="btn btn-success"
          onClick={() => {
            setShowForm(!showForm);
            setSelectedUser(null);
            setFormData({
              name: '',
              email: '',
              userID: '',
              dateOfBirth: '',
              department: '',
              password: '',
              image: null,
            });
          }}
        >
          {showForm ? 'Show Users' : 'Add New User'}
        </button>
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="card p-4">
          <h4>{selectedUser ? 'Edit User' : 'Add New User'}</h4>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            className="form-control mb-2"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            className="form-control mb-2"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="User ID"
            name="userID"
            value={formData.userID}
            className="form-control mb-2"
            onChange={handleChange}
          />
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            className="form-control mb-2"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Department"
            name="department"
            value={formData.department}
            className="form-control mb-2"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            className="form-control mb-2"
            onChange={handleChange}
          />
          <input type="file" className="form-control mb-3" onChange={handleFileChange} />
          <button type="submit" className="btn btn-primary">
            {selectedUser ? 'Update User' : 'Submit'}
          </button>
        </form>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`http://localhost:8000${user.image}`}
                    alt={user.name}
                    width="50"
                    height="50"
                    className="rounded-circle"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleAction('view', user)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleAction('edit', user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleAction('salary', user)}
                  >
                    Salary
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleAction('leave', user)}
                  >
                    Leave
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showSalaryManager && selectedUser && (
        <div
          className="modal show"
          style={{ display: 'block', position: 'fixed', top: 0, left: 0, zIndex: 1050 }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Salary Details</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowSalaryManager(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSalarySubmit}>
                  <input
                    type="text"
                    placeholder="Salary"
                    name="salary"
                    value={salaryData.salary}
                    className="form-control mb-2"
                    onChange={handleSalaryChange}
                  />
                  <input
                    type="text"
                    placeholder="Bonus"
                    name="bonus"
                    value={salaryData.bonus}
                    className="form-control mb-2"
                    onChange={handleSalaryChange}
                  />
                  <input
                    type="text"
                    placeholder="Deductions"
                    name="deductions"
                    value={salaryData.deductions}
                    className="form-control mb-2"
                    onChange={handleSalaryChange}
                  />
                  <button type="submit" className="btn btn-primary">
                    Update Salary
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showLeaveManagement && selectedUser && (
        <div
          className="modal show"
          style={{ display: 'block', position: 'fixed', top: 0, left: 0, zIndex: 1050 }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Leave Management</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowLeaveManagement(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleLeaveSubmit}>
                  <input
                    type="date"
                    name="startDate"
                    value={leaveData.startDate}
                    className="form-control mb-2"
                    onChange={handleLeaveChange}
                  />
                  <input
                    type="date"
                    name="endDate"
                    value={leaveData.endDate}
                    className="form-control mb-2"
                    onChange={handleLeaveChange}
                  />
                  <textarea
                    name="reason"
                    placeholder="Reason for leave"
                    value={leaveData.reason}
                    className="form-control mb-2"
                    onChange={handleLeaveChange}
                  ></textarea>
                  <button type="submit" className="btn btn-primary">
                    Submit Leave
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUserDetails && selectedUser && (
        <div
          className="modal show"
          style={{ display: 'block', position: 'fixed', top: 0, left: 0, zIndex: 1050 }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowUserDetails(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Department:</strong> {selectedUser.department}</p>
                <p><strong>Date of Birth:</strong> {selectedUser.dateOfBirth}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


