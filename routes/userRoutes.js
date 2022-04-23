const express = require('express');
const {
  getUsers, getUserById, createUser, updateUser, changeAvatar,
} = require('../controllers/userController');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);

userRoutes.get('/:id', getUserById);

userRoutes.post('/', createUser);

userRoutes.patch('/me', updateUser);

userRoutes.patch('/me/avatar', changeAvatar);

exports.userRoutes = userRoutes;
