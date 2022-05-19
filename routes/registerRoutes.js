// const express = require('express');
// const { celebrate, Joi } = require('celebrate');
// const { login, createUser } = require('../controllers/userController');

// const registerRoutes = express.Router();

// registerRoutes.post('/signin', express.json(), celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//   }),
// }), login);
// registerRoutes.post('/signup', express.json(), celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30),
//     about: Joi.string().min(2).max(30),
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//     avatar: Joi.string().pattern(
//       /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
//     ),
//   }),
// }), createUser);

// exports.registerRoutes = registerRoutes;
