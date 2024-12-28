import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../index.css"; // Add this for external styles

export default function Dashboard() {
  const [data, setData] = useState({
    posts: [],
    users: [],
    comments: [],
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/dashboard');
        if (response.data.success) {
          setData({
            posts: response.data.Posts || [],
            users: response.data.Users || [],
            comments: response.data.Comments || [],
            loading: false,
          });
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setData((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  if (data.loading) {
    return <div className="spinner-border text-primary" role="status"></div>;
  }

  return (
    <>
      <div>
        <h2 className="mb-4 text-white">Dashboard</h2>
        <div className="row">
          <div className="col-md-4 col-lg-4 col-sm-4 col-12">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">
                <h5 className="card-title"><i className="fas fa-users me-2" style={{ fontSize: '20px' }}></i> Total Employees</h5>
                <p className="card-text">{data.users.length > 0 ? data.users.length : 'Track and manage your employees here'}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 col-sm-4 col-12">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">
                <h5 className="card-title"><i className="fas fa-building me-2" style={{ fontSize: '20px' }}></i> Total Departments</h5>
                <p className="card-text">{data.posts.length > 0 ? data.posts.length : 'Organize and monitor departments effectively'}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 col-sm-4 col-12">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">
                <h5 className="card-title"><i className="fas fa-dollar-sign me-2" style={{ fontSize: '20px' }}></i> Monthly Pay</h5>
                <p className="card-text">{data.comments.length > 0 ? data.comments.length : 'Monitor salary and payment details here'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}