const express = require('express');
const {
  getUsers, getUserById, getInfo, updateUser, changeAvatar,
} = require('../controllers/userController');
const auth = require('../middlewares/auth');

const userRoutes = express.Router();

userRoutes.get('/', auth, getUsers);

userRoutes.get('/me', auth, getInfo);

userRoutes.get('/:id', auth, getUserById);

userRoutes.patch('/me', auth, updateUser);

userRoutes.patch('/me/avatar', auth, changeAvatar);

exports.userRoutes = userRoutes;
