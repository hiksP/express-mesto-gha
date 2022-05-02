const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.status(404).send({ message: 'Пользователи не найдены :(' });
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
    bcrypt.hash(req.body.password, 10)
    const user = await User.create({
      email: req.body.email,
      password: hash,
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
  User.findByIdAndUpdate(req.user._id, { name, about }, {
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
  User.findByIdAndUpdate(req.user._id, { avatar }, {
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

exports.login = (req, res) => {
  const {email, password} = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
       const token = jwt.sign({ _id: user._id }, 'pass', { expiresIn: '7d' });
        res.send({token})
    })
   .catch((err) => {
     res.status(401).send({message: err.message});
   })
}
