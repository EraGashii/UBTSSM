import express from 'express';
import dotenv from 'dotenv';
import DBCon from './utils/db.js';
import AuthRouters from './routes/Auth.js';
import cookieParser from 'cookie-parser';
import BlogsRouters from './routes/Blog.js';
import DahbaordRoutes from './routes/Dashboard.js';
import CommentsRouters from './routes/Comments.js';
import PublicRoutes from './routes/Public.js';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true,
};

app.use(cors(corsOptions)); // Use the correct variable name here

// Ensure the "uploads" directory exists
const uploadPath = path.resolve('uploads/');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
  console.log('uploads/ directory created successfully.');
} else {
  console.log('uploads/ directory already exists.');
}

// MongoDB connection
DBCon();

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("hello from backend");
});
app.use('/auth', AuthRouters);
app.use('/Blog', BlogsRouters);
app.use('/dahbaord', DahbaordRoutes);
app.use('/comment', CommentsRouters);
app.use('/public', PublicRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`App is running on Port ${PORT}`);
});
