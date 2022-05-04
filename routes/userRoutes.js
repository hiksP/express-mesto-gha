const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, getInfo, updateUser, changeAvatar,
} = require('../controllers/userController');
const auth = require('../middlewares/auth');

const userRoutes = express.Router();

userRoutes.get('/', auth, celebrate({
  headers: Joi.object().keys({
    cookie: Joi.string().required(),
  }).unknown(true),
}), getUsers);

userRoutes.get('/me', auth, celebrate({
  headers: Joi.object().keys({
    cookie: Joi.string().required(),
  }).unknown(true),
}), getInfo);

userRoutes.get('/:id', auth, celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), getUserById);

userRoutes.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

userRoutes.patch('/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), changeAvatar);

exports.userRoutes = userRoutes;
