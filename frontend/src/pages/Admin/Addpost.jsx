// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// export default function AddEmployees() {
//   const [employees, setEmployees] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     employeeID: '',
//     dateOfBirth: '',
//     department: '',
//     image: null,
//   });
//   const [showForm, setShowForm] = useState(false); // Toggle form visibility

//   // Fetch employees
//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/employee');
//       setEmployees(response.data.data);
//     } catch (error) {
//       toast.error('Failed to load employees');
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = new FormData();
//       for (const key in formData) {
//         data.append(key, formData[key]);
//       }
//       await axios.post('http://localhost:8000/employee/add', data);
//       toast.success('Employee added successfully');
//       fetchEmployees();
//       setFormData({
//         name: '',
//         email: '',
//         employeeID: '',
//         dateOfBirth: '',
//         department: '',
//         image: null,
//       });
//       setShowForm(false); // Hide form after submission
//     } catch (error) {
//       toast.error('Failed to add employee');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Manage Employees</h2>
//         <button
//           className="btn btn-success"
//           onClick={() => setShowForm(!showForm)}
//         >
//           {showForm ? 'Close Form' : 'Add New Employee'}
//         </button>
//       </div>

//       {/* Add Employee Form */}
//       {showForm && (
//         <div className="card mb-4">
//           <div className="card-body">
//             <form onSubmit={handleSubmit} encType="multipart/form-data">
//               <div className="row">
//                 <div className="col-md-6 mb-3">
//                   <label>Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label>Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label>Employee ID</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="employeeID"
//                     value={formData.employeeID}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label>Date of Birth</label>
//                   <input
//                     type="date"
//                     className="form-control"
//                     name="dateOfBirth"
//                     value={formData.dateOfBirth}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label>Department</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="department"
//                     value={formData.department}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label>Upload Image</label>
//                   <input
//                     type="file"
//                     className="form-control"
//                     name="image"
//                     onChange={handleFileChange}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="d-grid">
//                 <button type="submit" className="btn btn-primary">
//                   Add Employee
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Employee Table */}
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>S No</th>
//             <th>Image</th>
//             <th>Name</th>
//             <th>DOB</th>
//             <th>Department</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.length > 0 ? (
//             employees.map((employee, index) => (
//               <tr key={employee._id}>
//                 <td>{index + 1}</td>
//                 <td>
//                   <img
//                     src={`http://localhost:8000/uploads/${employee.image}`}
//                     alt="Employee"
//                     width="50"
//                     height="50"
//                     className="rounded-circle"
//                   />
//                 </td>
//                 <td>{employee.name}</td>
//                 <td>{new Date(employee.dateOfBirth).toLocaleDateString()}</td>
//                 <td>{employee.department}</td>
//                 <td>
//                   <button className="btn btn-primary me-2">View</button>
//                   <button className="btn btn-success me-2">Edit</button>
//                   <button className="btn btn-warning me-2">Salary</button>
//                   <button className="btn btn-danger">Leave</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="text-center">
//                 No Employees Found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
