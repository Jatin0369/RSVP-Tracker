const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  if (!jwtSecret) {
    return res.status(500).json({ msg: "JWT secret key is not set in the environment variables." });
  }

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });
  
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
  
};

module.exports = auth;
