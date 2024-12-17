import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import UserLayout from './Layouts/UserLayout';
import AdminLayout from './Layouts/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import User from './pages/Admin/User';
import Allpost from './pages/Admin/Allpost';
import ManageDepartments from './pages/Admin/ManageDepartments';
import ManageEmployees from './pages/Admin/ManageEmployees';
import AddSalaryForm from './Components/AddSalaryForm'; // Import AddSalaryForm

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
        </Route>

        {/* Admin Routes */}
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<User />} />
          <Route path="allposts" element={<Allpost />} />
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
