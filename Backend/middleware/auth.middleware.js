// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

const SECRET_CODE = process.env.SecretCode || "vgfxdse56t7ugs5ty7t5esety7";

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, SECRET_CODE);
    const user = await User.findById(decoded._id).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // attach user to request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token", error: err.message });
  }
};

module.exports = authenticateToken;
