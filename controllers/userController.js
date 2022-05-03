const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
const { getJwtToken } = require('../utils/jwt');
const NotFoundError = require('../errors/not-found-err');
const wrongAuthError = require('../errors/wrong-auth-err');
const wrongReqErorr = require('../errors/wrong-req-err');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      throw new NotFoundError('пользователи не найдены :(');
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      res.status(404).send({ message: 'Пользователь не найден' });
    } else {
      res.send(user);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id ' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка' });
    }
  }
};

exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
          reject(err)
        } else {
          resolve(hash)
        }
      })
    })
    const user = await User.create({
      email: req.body.email,
      password: hashedPassword,
    })
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка' });
    }
  }
};

exports.updateUser = async (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user.id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

exports.changeAvatar = async (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user.id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Переданы некорректные данные' });
      }
    });
};

exports.getInfo = async (req, res) => {
  const usertoken = req.cookies.jwt
  const decoded = jwt.verify(usertoken, 'pass');
  try {
    const user = await User.findById(decoded.id);
    if (user == null) {
      res.status(404).send({ message: 'Пользователь не найден' });
    } else {
      res.send(user);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id ' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка' });
    }
  }
}

exports.login = (req, res) => {
  const {email, password} = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
       const token = getJwtToken(user._id); 
       res
       .cookie('jwt', token, {
         maxAge: 3600000 * 24 * 7,
         httpOnly: true
       })
       .send(token);
    })
   .catch((err) => {
     res.status(401).send({message: err.message});
   })
}
