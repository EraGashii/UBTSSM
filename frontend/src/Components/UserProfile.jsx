import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user details
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

      // Check if response is successful and contains the required data
      if (response.status === 200 && response.data) {
        setUserDetails(response.data);
      } else {
        toast.error('Failed to load user details');
      }
    } catch (error) {
      // Log more detailed error information
      console.error('Error fetching user details:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to load user details');
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to call fetchUserDetails when component mounts
  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Conditional rendering based on loading and userDetails state
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
        <div className="text-center">
          <img
            src={`http://localhost:8000${userDetails.image || '/default-avatar.png'}`} // Use default image if image is undefined
            alt={userDetails.name || 'User Avatar'} // Use fallback text if name is undefined
            width="150"
            height="150"
            className="rounded-circle"
          />
        </div>
        <div className="mt-3">
          <p><strong>Name:</strong> {userDetails.name || 'N/A'}</p>
          <p><strong>Email:</strong> {userDetails.email || 'N/A'}</p>
          <p><strong>Employee ID:</strong> {userDetails.employeeID || 'N/A'}</p>
          <p><strong>Date of Birth:</strong> {userDetails.dateOfBirth || 'N/A'}</p>
          <p><strong>Department:</strong> {userDetails.department || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
