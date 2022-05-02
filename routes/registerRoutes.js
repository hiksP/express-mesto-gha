const express = require('express');
const {login, createUser} = require('../controllers/userController')

const registerRoutes = express.Router();


registerRoutes.post('/signin', express.json(), login);
registerRoutes.post('/signup', express.json(), createUser);

exports.registerRoutes = registerRoutes;