import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile.jsx';
import UserLayout from './Layouts/UserLayout';
import AdminLayout from './Layouts/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import ManageDepartments from './pages/Admin/ManageDepartments';
import ManageEmployees from './pages/Admin/ManageEmployees';
import AddSalaryForm from './Components/AddSalaryForm'; // Import AddSalaryForm
import UserProfile from './Components/UserProfile.jsx';

import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="post/:id" element={<Post />} />
          <Route path="profile/:id" element={<Profile />} />
             <Route path="user-profile/:id" element={<UserProfile />} /> 
        </Route>

        {/* Admin Routes */}
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="department" element={<ManageDepartments />} />
          <Route path="manage-employees" element={<ManageEmployees />} />
          <Route path="add-salary" element={<AddSalaryForm />} /> {/* New Route */}
       
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}