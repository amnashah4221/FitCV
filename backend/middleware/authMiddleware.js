const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token found' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      return res.status(401).json({
        message: jwtError.name === 'TokenExpiredError' ? 'Token expired' : 'Token invalid',
      });
    }
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    return next();
  } catch (error) {
    console.error('AUTH SERVER ERROR:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const optionalProtect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    if (token) {
      let decoded = null;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (jwtError) {
        console.warn('Optional auth: invalid token:', jwtError.message);
      }

      if (decoded) {
        try {
          const user = await User.findById(decoded.id).select('-password');
          if (user) {
            req.user = user;
          }
        } catch (dbError) {
          console.error('Optional auth: DB error:', dbError.message);
        }
      }
    }
  }

  next();
};

module.exports = { protect, optionalProtect };
