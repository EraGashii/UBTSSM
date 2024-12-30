import React from 'react';

export default function UserProfile() {
  // Static user details
  const userDetails = {
    image: '/images/Besnik.jpg', // Path to a default avatar image
    name: 'Besnik Qehaja',
    email: 'besnik.qehaja@ubt-uni.net',
    userID: '22222',
    dateOfBirth: '1990-01-01',
    department: 'Shkenca Kompjuterike dhe Inxhineri ',
    designation: 'Rrjeta Kompjuterike',
    gender: 'Male',
    maritalStatus: 'Married',
  };

  return (
    <div className="container mt-4">
      <h2>Your Profile</h2>
      <div className="card p-4">
        <div className="text-center">
          <img
            src={userDetails.image}
            alt={userDetails.name}
            width="150"
            height="150"
            className="rounded-circle"
          />
        </div>
        <div className="mt-3">
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>User ID:</strong> {userDetails.userID}</p>
          <p><strong>Date of Birth:</strong> {new Date(userDetails.dateOfBirth).toLocaleDateString()}</p>
          <p><strong>Department:</strong> {userDetails.department}</p>
          <p><strong>Designation:</strong> {userDetails.designation}</p>
          <p><strong>Gender:</strong> {userDetails.gender}</p>
          <p><strong>Marital Status:</strong> {userDetails.maritalStatus}</p>
        </div>
      </div>
    </div>
  );
}
