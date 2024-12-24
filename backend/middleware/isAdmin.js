import jwt from 'jsonwebtoken'
import User from '../models/user.js';

const isAdmin = async (req, res, next) => {
   try {
     const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
     if (!token) {
       return res.status(401).json({ message: 'Unauthorized: Token is required' });
     }
 
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     const user = await User.findById(decoded.userId);
 
     if (!user) {
       return res.status(403).json({ message: 'Unauthorized: User does not exist' });
     }
 
     if (user.role !== 'admin') {
       return res.status(403).json({ message: 'Unauthorized: Access restricted to admins only' });
     }
 
     next();
   } catch (error) {
     console.error('Error in isAdmin middleware:', error.message);
     return res.status(500).json({ message: 'Internal Server Error' });
   }
 };
 
 const isLogin = async (req, res, next) => {
   try {
     const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
     if (!token) {
       return res.status(401).json({ message: 'Unauthorized: Token is required' });
     }
 
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     const user = await User.findById(decoded.userId);
 
     if (!user) {
       return res.status(403).json({ message: 'Unauthorized: User does not exist' });
     }
 
     req.user = user;
     next();
   } catch (error) {
     console.error('Error in isLogin middleware:', error.message);
     return res.status(500).json({ message: 'Internal Server Error' });
   }
 };
 
 export { isAdmin, isLogin };
 