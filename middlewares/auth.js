const jwt = require('jsonwebtoken');
const WrongAuthError = require('../errors/wrong-auth-err');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;

  if (!authorization) {
    throw new WrongAuthError('Необходима авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(authorization, 'pass');
  } catch (err) {
    next(err);
  }
  req.user = payload;

  next();
};
