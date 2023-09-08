const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from cookie
  const token = req.header('Authorization').split(' ')[1];

  // Check if not token
  if (!token) {
    console.log("No token, authorization denied")
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log("Token is not valid")
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
