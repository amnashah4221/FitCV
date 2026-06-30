const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "No token found" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      return next();
    }

    return res.status(401).json({ message: "Not authorized" });

  } catch (error) {
    console.error("AUTH ERROR:", error);

    return res.status(401).json({
      message: "Token failed or invalid secret",
      error: error.message
    });
  }
};

module.exports = { protect }