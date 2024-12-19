import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState(null);  // Stores the fetched user details
  const [loading, setLoading] = useState(true);  // Manages the loading state

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('authToken');  // Retrieve the token

      try {
        const response = await axios.get('http://localhost:8000/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,  // Add token in Authorization header
          },
        });
        setUserDetails(response.data);  // Store fetched user details
      } catch (error) {
        toast.error('Failed to load user details');  // Error handling
      } finally {
        setLoading(false);  // Set loading to false after data is fetched
      }
    };

    fetchUserDetails();  // Fetch the user details
  }, []);  // Empty dependency array to run the effect once when the component mounts

  if (loading) {
    return <div>Loading...</div>;  // Show loading message while fetching data
  }

  if (!userDetails) {
    return <div>Unable to load user details</div>;  // Error message if data is not available
  }

  return (
    <div className="container mt-4">
      <h2>Your Profile</h2>
      <div className="card p-4">
        <div>
          <img
            src={`http://localhost:8000${userDetails.image}`}  // User's profile image
            alt={userDetails.name}
            width="150"
            height="150"
            className="rounded-circle"
          />
        </div>
        <div className="mt-3">
          <p><strong>Name:</strong> {userDetails.name}</p>  // User's name
          <p><strong>Email:</strong> {userDetails.email}</p>  // User's email
          <p><strong>Employee ID:</strong> {userDetails.employeeID}</p>  // User's employee ID
          <p><strong>Date of Birth:</strong> {userDetails.dateOfBirth}</p>  // User's date of birth
          <p><strong>Department:</strong> {userDetails.department}</p>  // User's department
        </div>
      </div>
    </div>
  );
}
