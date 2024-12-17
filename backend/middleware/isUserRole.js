// backend/middleware/isUserRole.js

export const isUserRole = (req, res, next) => {
    const user = req.user; // This assumes the user object is attached to req after authentication (e.g., by a previous auth middleware)
  
    // Check if the user's role is 'user'
    if (user.role !== 'user') {
      return res.status(403).json({ message: 'Access denied. User role required.' });
    }
  
    next(); // Proceed to the next middleware/route handler if the user role is 'user'
  };
  