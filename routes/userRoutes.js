const express = require('express');
const { getUsers, getUserById, createUser, updateUser, changeAvatar} = require('../controllers/userController')

const userRoutes = express.Router();

userRoutes.get('/', getUsers);

userRoutes.get('/:id', getUserById);

userRoutes.post('/', express.json(), createUser);

userRoutes.patch('/me', express.json(), updateUser);

userRoutes.patch('/me/avatar', express.json(), changeAvatar);

exports.userRoutes = userRoutes;