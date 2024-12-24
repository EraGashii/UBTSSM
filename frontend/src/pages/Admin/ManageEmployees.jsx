import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import LeaveManagement from './LeaveManagement'; // Import LeaveManagement component (unchanged)
import SalaryManager from './SalaryManager'; // Import SalaryManager component (unchanged)

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showLeaveManagement, setShowLeaveManagement] = useState(false); // Control leave UI visibility
  const [showUserDetails, setShowUserDetails] = useState(false); // Control user details modal visibility
  const [showSalaryManager, setShowSalaryManager] = useState(false); // Control SalaryManager visibility

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userID: '',
    dateOfBirth: '',
    department: '',
    image: null,
    password: '',
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
        await axios.put(`http://localhost:8000/user/update/${selectedUser._id}`, data);
        toast.success('User updated successfully');
      } else {
        await axios.post('http://localhost:8000/user/add', data);
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
    } else if (action === 'view') {
      setSelectedUser(user);
      setShowUserDetails(true);
    } else if (action === 'salary') {
      setSelectedUser(user);
      setShowSalaryManager(true);
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

      {showLeaveManagement && selectedUser && (
        <LeaveManagement
          userID={selectedUser.userID}
          onBack={() => {
            setShowLeaveManagement(false);
            setSelectedUser(null);
          }}
        />
      )}

      {showSalaryManager && selectedUser && (
        <SalaryManager
          user={selectedUser}
          onClose={() => setShowSalaryManager(false)}
        />
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
                <p><strong>User ID:</strong> {selectedUser.userID}</p>
                <p><strong>Date of Birth:</strong> {selectedUser.dateOfBirth}</p>
                <p><strong>Department:</strong> {selectedUser.department}</p>
                <p><strong>Salary:</strong> {selectedUser.salary}</p>
                {selectedUser.image && (
                  <img
                    src={`http://localhost:8000${selectedUser.image}`}
                    alt={selectedUser.name}
                    width="150"
                    height="150"
                    className="rounded-circle"
                  />
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowUserDetails(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
