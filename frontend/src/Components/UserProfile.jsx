import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user details
  const fetchUserDetails = async () => {
    try {
      // Use axios with credentials to include cookies automatically
      const response = await axios.get('http://localhost:8000/users', {
        withCredentials: true, // Ensures cookies are sent with the request
      });

      if (response.status === 200 && response.data) {
        setUserDetails(response.data); // Store user details in state
      } else {
        toast.error('Failed to load user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      toast.error(
        error.response?.data?.message || error.message || 'Failed to load user details'
      );
      if (error.response?.status === 401) {
        toast.error('Unauthorized! Please log in again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You might replace this with a spinner or more elaborate loading message
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
          <p><strong>Name:</strong> {userDetails.name || 'Not Available'}</p>
          <p><strong>Email:</strong> {userDetails.email || 'Not Available'}</p>
          <p><strong>User ID:</strong> {userDetails.userID || 'Not Available'}</p>
          <p><strong>Date of Birth:</strong> {new Date(userDetails.dateOfBirth).toLocaleDateString() || 'Not Available'}</p>
          <p><strong>Department:</strong> {userDetails.department || 'Not Available'}</p>
          <p><strong>Designation:</strong> {userDetails.designation || 'Not Available'}</p>
          <p><strong>Gender:</strong> {userDetails.gender || 'Not Available'}</p>
          <p><strong>Marital Status:</strong> {userDetails.maritalStatus || 'Not Available'}</p>
        </div>
      </div>
    </div>
  );
}
