const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
    } catch (error) {
      console.error("Error splitting token: ", error);
      return res.status(400).json({ msg: "Token is not valid" });
    }
  }

  if (!token) {
    console.log("No token, authorization denied")
    console.log(req.headers)
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Proceed to verify the token using jwt.verify or your existing logic
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error("Token verification failed: ", error);
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
