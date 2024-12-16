import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ManageEmployees() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
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
      console.log('Employee Data:', response.data); // Debugging line
      setEmployees(response.data.data);
    } catch (error) {
      console.error('Error fetching employees:', error.message); // Log the error
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
      await axios.post('http://localhost:8000/employee/add', data);
      toast.success('Employee added successfully');
      fetchEmployees();
      setShowForm(false);
    } catch (error) {
      toast.error('Failed to add employee');
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>Manage Employees</h2>
        <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Show Employees' : 'Add New Employee'}
        </button>
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="card p-4">
          <input type="text" placeholder="Name" name="name" className="form-control mb-2" onChange={handleChange} />
          <input type="email" placeholder="Email" name="email" className="form-control mb-2" onChange={handleChange} />
          <input type="text" placeholder="Employee ID" name="employeeID" className="form-control mb-2" onChange={handleChange} />
          <input type="date" name="dateOfBirth" className="form-control mb-2" onChange={handleChange} />
          <input type="text" placeholder="Department" name="department" className="form-control mb-2" onChange={handleChange} />
          <input type="file" className="form-control mb-3" onChange={handleFileChange} />
          <button type="submit" className="btn btn-primary">Submit</button>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
