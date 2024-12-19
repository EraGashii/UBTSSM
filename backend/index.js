import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import DBCon from './utils/db.js';
import AuthRouters from './routes/Auth.js';
import BlogsRouters from './routes/Blog.js';
import UsersRouters from './routes/Users.js';
import profileRoutes from './routes/profileRoutes.js';
import EmployeeRouters from './routes/Employee.js';
import DepartmentRoutes from './routes/Department.js';
import LeaveRoutes from './routes/LeaveRoutes.js';
import SalariesRoutes from './routes/salaries.js';
import employeeRoutes from './routes/employeeRoutes.js';


dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();

// CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,  // Allow cookies to be sent with requests
}));

// Ensure "uploads" directory exists
const uploadPath = path.resolve('uploads/');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
  console.log('uploads/ directory created successfully.');
} else {
  console.log('uploads/ directory already exists.');
}

// Middleware
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json()); // To parse JSON body
app.use('/uploads', express.static('uploads')); // Serve uploaded images
app.use(express.json());


// Connect to the database
DBCon();

// Routes
app.use('/auth', AuthRouters);
app.use('/blog', BlogsRouters);
app.use('/users', UsersRouters);
app.use('/profile', profileRoutes);
app.use('/employee', EmployeeRouters);
app.use('/uploads', express.static('uploads'));
app.use('/department', DepartmentRoutes);
app.use('/leave', LeaveRoutes);
app.use('/salaries', SalariesRoutes); // <-- Add this line for salary routes
app.use('/user', employeeRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`);
});
