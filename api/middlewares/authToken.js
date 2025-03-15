const jwt = require('jsonwebtoken');
require('dotenv').config();

// Authentication middleware
const authenticateToken = (req, res, next) => {
  // Get token from authorization header
  const authHeader = req.header('authorization');
  const token = authHeader && authHeader.split(' ')[1];

  // If no token, return 401 Unauthorized
  if (token == null) {
    return res.status(401).json({ status: 401, message: 'Unauthorized, token not found' });
  }

  // Verify the token
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;  // Attach the user object to the request
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('Error verifying token', err);
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateToken;
