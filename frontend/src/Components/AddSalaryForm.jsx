import React, { useState } from 'react';
import toast from 'react-hot-toast';
const AddSalaryForm = () => {
  const [formData, setFormData] = useState({
    department: '',
    employee: '',
    basicSalary: '',
    allowances: '',
    deductions: '',
    payDate: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/salaries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    
      if (response.ok) {
        toast.success('Salary added successfully');
        setFormData({
          department: '',
          employee: '',
          basicSalary: '',
          allowances: '',
          deductions: '',
          payDate: '',
        });
      } else {
        toast.error('Error adding salary');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '30px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Add New Salary</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ fontSize: '16px', fontWeight: '600' }}>Department</label>
          <select name="department" value={formData.department} onChange={handleChange} required
                  style={{ width: '100%', padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}>
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="IT">IT</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '16px', fontWeight: '600' }}>Employee</label>
          <select name="employee" value={formData.employee} onChange={handleChange} required
                  style={{ width: '100%', padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}>
            <option value="">Select Employee</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '16px', fontWeight: '600' }}>Basic Salary</label>
          <input
            type="number"
            name="basicSalary"
            placeholder="Insert Salary"
            value={formData.basicSalary}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '16px', fontWeight: '600' }}>Allowances</label>
          <input
            type="number"
            name="allowances"
            placeholder="Monthly Allowances"
            value={formData.allowances}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '16px', fontWeight: '600' }}>Deductions</label>
          <input
            type="number"
            name="deductions"
            placeholder="Monthly Deductions"
            value={formData.deductions}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '16px', fontWeight: '600' }}>Pay Date</label>
          <input
            type="date"
            name="payDate"
            value={formData.payDate}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
          />
        </div>

        <button type="submit"
                style={{
                  padding: '12px',
                  backgroundColor: '#007BFF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007BFF'}>
          Add Salary
        </button>
      </form>
    </div>
  );
};

export default AddSalaryForm;
