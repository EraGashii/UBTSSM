import React from 'react';
import { FaUser, FaLock, FaCamera } from 'react-icons/fa';

export default function Profile() {
  return (
    <div className="profile-container">
      <h1 className="profile-title">Update Profile</h1>
      <form className="profile-form">
        <div className="profile-image-section">
          <label htmlFor="profileImage" className="profile-image-label">
            <img 
              src="https://via.placeholder.com/150" 
              alt="User Profile" 
              className="profile-image"
            />
            <FaCamera className="profile-camera-icon" />
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="profile-image-input"
          />
        </div>

        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            placeholder="Update Name"
            className="profile-input"
          />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Old Password"
            className="profile-input"
          />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="New Password"
            className="profile-input"
          />
        </div>

        <button type="submit" className="profile-button">Update Profile</button>
      </form>
    </div>
  );
}
