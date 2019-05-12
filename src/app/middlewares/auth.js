const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { secrets } = require('../../config/secrets');

const {
  auth: { key },
} = secrets;

module.exports.validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'Token not provided' });
  }
  const [, token] = authorization.split(' ');
  try {
    const { id } = await promisify(jwt.verify)(token, key);
    req.userId = id;
    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
