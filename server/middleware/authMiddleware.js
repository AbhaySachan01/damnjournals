import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  // AB TOKEN SEEDHA COOKIES SE AAYEGA!
  let token = req.cookies.jwt; 

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// authMiddleware.js

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // Agar admin hai toh aage badhne do
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};