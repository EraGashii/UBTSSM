import React, { useState } from 'react';

const AddSalaryForm = () => {
  const [formData, setFormData] = useState({
    department: '',
    employee: '',
    basicSalary: '',
    allowances: '',
    deductions: '',
    payDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Basic validation
    if (!formData.department || !formData.employee || !formData.basicSalary || !formData.payDate) {
      setErrorMessage('Please fill out all required fields.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/salaries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Salary added successfully!');
        setFormData({
          department: '',
          employee: '',
          basicSalary: '',
          allowances: '',
          deductions: '',
          payDate: '',
        });
      } else {
        setErrorMessage('Error adding salary. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Add New Salary</h2>

      {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
      {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Department</label>
          <select name="department" value={formData.department} onChange={handleChange} required>
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="IT">IT</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div>
          <label>Employee</label>
          <select name="employee" value={formData.employee} onChange={handleChange} required>
            <option value="">Select Employee</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
          </select>
        </div>

        <div>
          <label>Basic Salary</label>
          <input
            type="number"
            name="basicSalary"
            placeholder="Insert Salary"
            value={formData.basicSalary}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Allowances</label>
          <input
            type="number"
            name="allowances"
            placeholder="Monthly Allowances"
            value={formData.allowances}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Deductions</label>
          <input
            type="number"
            name="deductions"
            placeholder="Monthly Deductions"
            value={formData.deductions}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Pay Date</label>
          <input
            type="date"
            name="payDate"
            value={formData.payDate}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Add Salary'}
        </button>
      </form>
    </div>
  );
};

export default AddSalaryForm;
