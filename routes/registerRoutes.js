const express = require('express');
const {login, createUser} = require('../controllers/userController')

const registerRoutes = express.Router();

registerRoutes.post('/signin', login);
registerRoutes.post('/signup', createUser);

exports.registerRoutes = registerRoutes;