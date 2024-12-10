import express from 'express';
import { Register, Login, Logout } from '../controllers/Auth.js';
import upload from '../middleware/multer.js';

const AuthRouters = express.Router();

// Define authentication routes
AuthRouters.post('/register', upload.single('profile'), Register);
AuthRouters.post('/login', Login);
AuthRouters.post('/logout', Logout);

export default AuthRouters  



