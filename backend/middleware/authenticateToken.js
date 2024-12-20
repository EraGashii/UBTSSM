import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the user information to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};
