const express = require('express');
const {
  getUsers, getUserById, createUser, updateUser, changeAvatar,
} = require('../controllers/userController');
const auth = require('../middlewares/auth');

const userRoutes = express.Router();

userRoutes.get('/', auth, getUsers);

userRoutes.get('/:id', auth, getUserById);

userRoutes.patch('/me', auth, updateUser);

userRoutes.patch('/me/avatar', auth, changeAvatar);

exports.userRoutes = userRoutes;
