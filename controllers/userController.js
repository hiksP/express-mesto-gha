const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
const { User } = require('../models/user');
const { getJwtToken } = require('../utils/jwt');
const NotFoundError = require('../errors/not-found-err');
const wrongAuthError = require('../errors/wrong-auth-err');
const wrongReqErorr = require('../errors/wrong-req-err');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (!users) {
      throw new NotFoundError('пользователи не найдены :(');
    } else {
      res.send(users);
    }
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  console.log(req.params);
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      throw new NotFoundError('пользователь не найден');
    } else {
      res.send(user);
    }
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
    const user = await User.create({
      email: req.body.email,
      password: hashedPassword,
    });
    res.send(user);
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).send({ message: 'Пользователь уже зарегестрирован!' });
    } else {
      next(err);
    }
  }
};

exports.updateUser = async (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user.id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

exports.changeAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user.id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

exports.getInfo = async (req, res, next) => {
  const usertoken = req.cookies.jwt;
  const decoded = jwt.verify(usertoken, 'pass');
  try {
    const user = await User.findById(decoded.id);
    if (user == null) {
      throw new NotFoundError('Пользователь не найден');
    } else {
      res.send(user);
    }
  } catch (err) {
    next(err);
  }
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new wrongAuthError('Не введен логин или пароль');
  } else {
    return User.findUserByCredentials(email, password)
      .then((user) => {
        const token = getJwtToken(user._id);
        res
          .cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          })
          .send(token);
      })
      .catch(next);
  }
};
