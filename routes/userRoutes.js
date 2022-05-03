const express = require('express');
const {
  getUsers, getUserById, getInfo, updateUser, changeAvatar,
} = require('../controllers/userController');
const auth = require('../middlewares/auth');
const { celebrate, Joi } = require('celebrate');

const userRoutes = express.Router();

userRoutes.get('/', auth, getUsers);

userRoutes.get('/me', auth, getInfo);

userRoutes.get('/:id', auth, getUserById);

userRoutes.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

userRoutes.patch('/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required()
  }),
}), changeAvatar);

exports.userRoutes = userRoutes;
