import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ManageEmployees() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    employeeID: '',
    dateOfBirth: '',
    department: '',
    image: null,
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8000/employee');
      setEmployees(response.data.data);
    } catch (error) {
      toast.error('Failed to load employees');
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

      if (selectedEmployee) {
        // Edit employee
        await axios.put(`http://localhost:8000/employee/update/${selectedEmployee._id}`, data);
        toast.success('Employee updated successfully');
      } else {
        // Add new employee
        await axios.post('http://localhost:8000/employee/add', data);
        toast.success('Employee added successfully');
      }

      fetchEmployees();
      setShowForm(false);
      setSelectedEmployee(null);
    } catch (error) {
      toast.error('Failed to submit employee');
    }
  };

  const handleEdit = (emp) => {
    setSelectedEmployee(emp);
    setShowForm(true);
    setFormData({
      name: emp.name,
      email: emp.email,
      employeeID: emp.employeeID,
      dateOfBirth: emp.dateOfBirth,
      department: emp.department,
      image: null,
    });
  };

  const handleAction = (action, emp) => {
    if (action === 'edit') handleEdit(emp);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>Manage Employees</h2>
        <button
          className="btn btn-success"
          onClick={() => {
            setShowForm(!showForm);
            setSelectedEmployee(null);
            setFormData({
              name: '',
              email: '',
              employeeID: '',
              dateOfBirth: '',
              department: '',
              password: '',
              image: null,
            });
          }}
        >
          {showForm ? 'Show Employees' : 'Add New Employee'}
        </button>
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="card p-4">
          <h4>{selectedEmployee ? 'Edit Employee' : 'Add New Employee'}</h4>
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
            placeholder="Employee ID"
            name="employeeID"
            value={formData.employeeID}
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
            {selectedEmployee ? 'Update Employee' : 'Submit'}
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
            {employees.map((emp, index) => (
              <tr key={emp._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`http://localhost:8000${emp.image}`}
                    alt={emp.name}
                    width="50"
                    height="50"
                    className="rounded-circle"
                  />
                </td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleAction('view', emp)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleAction('edit', emp)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleAction('salary', emp)}
                  >
                    Salary
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleAction('leave', emp)}
                  >
                    Leave
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
