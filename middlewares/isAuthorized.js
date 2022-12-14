const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../constants/config');
const User = require('../models/user.model');

module.exports = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.replace('Bearer ', '');
    if (!accessToken) {
      return res.status(403).json({
        message: 'No auth token provided',
      });
    }

    const { id } = await jwt.verify(accessToken, jwtSecret);
    const user = await User.findById(id);

    if (!user) {
      return res.status(403).json({
        message: 'Invalid auth token',
      });
    }

    req.user = user;

    next();
  } catch (e) {
    console.log('isAuthorized middleware => ', e);
    res.status(500).json({
      message: e.message ? e.message : e,
    });
  }
}
