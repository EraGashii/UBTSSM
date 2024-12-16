import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ManageDepartments() {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null); // Track the department being edited

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/department');
      setDepartments(response.data.data);
    } catch (error) {
      toast.error('Failed to load departments');
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Handle form submission for Add and Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Update department
        const response = await axios.put(`http://localhost:8000/department/${editingId}`, formData);
        toast.success(response.data.message);
      } else {
        // Add department
        const response = await axios.post('http://localhost:8000/department/add', formData);
        toast.success(response.data.message);
      }
      fetchDepartments();
      handleCloseModal();
    } catch (error) {
      toast.error('Failed to save department');
    }
  };

  // Handle delete department
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/department/${id}`);
      toast.success('Department deleted successfully');
      fetchDepartments();
    } catch (error) {
      toast.error('Failed to delete department');
    }
  };

  // Open modal for editing
  const handleEdit = (department) => {
    setFormData({ name: department.name, description: department.description });
    setEditingId(department._id);
  };

  // Close modal and reset state
  const handleCloseModal = () => {
    setFormData({ name: '', description: '' });
    setEditingId(null);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Departments</h2>
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#departmentModal"
          onClick={() => handleCloseModal()}
        >
          Add Department
        </button>
      </div>

      {/* Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>S No</th>
            <th>Department Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {departments.length > 0 ? (
            departments.map((dept, index) => (
              <tr key={dept._id}>
                <td>{index + 1}</td>
                <td>{dept.name}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#departmentModal"
                    onClick={() => handleEdit(dept)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(dept._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No Departments Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add/Edit Department Modal */}
      <div
        className="modal fade"
        id="departmentModal"
        tabIndex="-1"
        aria-labelledby="departmentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="departmentModalLabel">
                {editingId ? 'Edit Department' : 'Add Department'}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleCloseModal()}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Department Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Department Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  ></textarea>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-success">
                    {editingId ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
