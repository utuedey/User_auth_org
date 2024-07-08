const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      status: 'Unauthorized',
      message: 'No token provided',
      statusCode: 401,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(401).json({
        status: 'Unauthorized',
        message: 'Invalid token',
        statusCode: 401,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'Unauthorized',
      message: 'Invalid token',
      statusCode: 401,
    });
  }
};

module.exports = authMiddleware;
