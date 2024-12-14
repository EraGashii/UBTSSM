import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios'; // Import axios for HTTP requests

export default function User() {
  const [users, setUsers] = useState([]);

  // Fetch users from the backend when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/users/${id}`);
      // Update the users state after deletion
      setUsers(users.filter(user => user.id !== id));
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-white mb-4">Users</h1>
      <div className="table-responsive">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
