import React, { useState } from 'react';
import axios from 'axios';

const SalaryManager = () => {
  const [salaryData, setSalaryData] = useState(null);
  const [newSalary, setNewSalary] = useState(null); // For modifications
  const [userID, setuserID] = useState('');

  const fetchSalary = async () => {
    try {
      const response = await axios.get(`/salaries/${userID}`); // Adjust route if necessary
      setSalaryData(response.data);
    } catch (error) {
      console.error('Error fetching salary:', error);
    }
  };

  const updateSalary = async (updatedData) => {
    try {
      const response = await axios.put(`/salaries/${userID}`, updatedData);
      setSalaryData(response.data);
      alert('Salary updated successfully!');
    } catch (error) {
      console.error('Error updating salary:', error);
    }
  };

  return (
    <div>
      <h1>Salary Manager</h1>
      <input 
        type="text" 
        placeholder="Enter Employee ID" 
        value={userID} 
        onChange={(e) => setuserID(e.target.value)} 
      />
      <button onClick={fetchSalary}>Get Salary</button>

      {salaryData && (
        <div>
          <h3>Current Salary Information</h3>
          <p>Basic Salary: {salaryData.basicSalary}</p>
          <p>Allowances: {salaryData.allowances}</p>
          <p>Deductions: {salaryData.deductions}</p>
          <p>Pay Date: {salaryData.payDate}</p>

          <h4>Update Salary</h4>
          <input 
            type="number" 
            placeholder="Enter New Basic Salary" 
            value={newSalary} 
            onChange={(e) => setNewSalary(e.target.value)} 
          />
          <button onClick={() => updateSalary({ basicSalary: newSalary })}>
            Update Salary
          </button>
        </div>
      )}
    </div>
  );
};

export default SalaryManager;
