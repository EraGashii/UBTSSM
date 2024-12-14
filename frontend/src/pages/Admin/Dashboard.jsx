import React, { useState, useEffect } from 'react';
import axios from 'axios';//   // Assuming you're using axios for API requests

export default function Dashboard() {
  const [post, setPost] = useState([]);  // Default empty array
  const [users, setUsers] = useState([]);  // Default empty array
  const [comments, setComments] = useState([]);  // Default empty array
  const [loading, setLoading] = useState(true);  // To handle loading state

  useEffect(() => {
    const GetData = async () => {
      try {
        const response = await axios.get('/dashboard');
        const data = response.data;
        
        // Set data to state variables only after ensuring the response has valid data
        setPost(data.Posts || []);  // Set empty array if Posts is undefined
        setUsers(data.Users || []);  // Set empty array if Users is undefined
        setComments(data.Comments || []);  // Set empty array if Comments is undefined

        console.log(data);  // Log the response for debugging
      } catch (error) {
        console.log(error);  // Log any errors that occur during the fetch
      } finally {
        setLoading(false);  // Set loading to false once data is fetched
      }
    };

    GetData();
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  // Conditional rendering to show loading indicator until data is fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h2 className="mb-4 text-white">Dashboard</h2>
        <div className="row">
          <div className="col-md-4 col-lg-4 col-sm-4 col-12">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Total Employees</h5>
                <p className="card-text">{users?.length || 0}</p> {/* Safe check with optional chaining */}
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 col-sm-4 col-12">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Total Departaments</h5>
                <p className="card-text">{post?.length || 0}</p> {/* Safe check with optional chaining */}
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 col-sm-4 col-12">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Monthly Pay</h5>
                <p className="card-text">{comments?.length || 0}</p> {/* Safe check with optional chaining */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
