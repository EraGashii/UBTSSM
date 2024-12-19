import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

      if (!token) {
        toast.error('No token found, please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/user/me', {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        });

        setUserDetails(response.data); // Store fetched user details
      } catch (error) {
        console.error('Error fetching user details:', error);
        toast.error('Failed to load user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails(); // Call the function
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userDetails) {
    return <div>Unable to load user details</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Your Profile</h2>
      <div className="card p-4">
        <div>
          <img
            src={`http://localhost:8000${userDetails.image}`}
            alt={userDetails.name}
            width="150"
            height="150"
            className="rounded-circle"
          />
        </div>
        <div className="mt-3">
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Employee ID:</strong> {userDetails.employeeID}</p>
          <p><strong>Date of Birth:</strong> {userDetails.dateOfBirth}</p>
          <p><strong>Department:</strong> {userDetails.department}</p>
        </div>
      </div>
    </div>
  );
}
