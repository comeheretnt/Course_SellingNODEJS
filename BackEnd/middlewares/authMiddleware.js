const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Middleware to check if the user is authenticated
const checkAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

// Middleware to authorize user based on role
const authorizeUser = (req, res, next) => {
  const { role } = req.user;

  if (role !== 'user') {
    return res.status(403).json({ message: 'Access denied.' });
  }

  next();
};

module.exports = { checkAuth, authorizeUser };