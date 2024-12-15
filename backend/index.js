import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import DBCon from './utils/db.js';
import AuthRouters from './routes/Auth.js';
import BlogsRouters from './routes/Blog.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import UsersRouters from './routes/Users.js'; // Import the Users route
import profileRoutes from "./routes/profileRoutes.js";


dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();

// CORS middleware should be applied before routes
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

// Database connection
DBCon();

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/auth', AuthRouters);
app.use('/blog', BlogsRouters);
app.use('/users', UsersRouters);  // Register the Users route

// Start server
app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`);
});

//UPDATE PROFILE

dotenv.config(); // Load environment variables


// Connect to the database
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(express.json()); // To parse JSON body
app.use('uploads/', express.static('uploads')); // Serve uploaded images as static files

// Use the profile routes
app.use('routes/profileRoutes.js', profileRoutes); // Authenticate middleware for profile routes



