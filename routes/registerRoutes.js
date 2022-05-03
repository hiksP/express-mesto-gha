const express = require('express');
const {login, createUser} = require('../controllers/userController')
const { celebrate, Joi } = require('celebrate');

const registerRoutes = express.Router();


registerRoutes.post('/signin', express.json(), celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().min(2).max(30),
      password: Joi.string().required().min(8)
    }),
  }), login);
registerRoutes.post('/signup', express.json(),celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().min(2).max(30),
      password: Joi.string().required().min(8)
    }),
  }), createUser);

exports.registerRoutes = registerRoutes;