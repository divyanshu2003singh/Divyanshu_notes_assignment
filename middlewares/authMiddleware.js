// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your-secret-key');
    
    // Set the user ID in the request for later use
    req.userId = decoded.userId;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Token verification failed
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

module.exports = {
  authenticate,
};
