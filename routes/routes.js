const express = require('express');
const { userRoutes } = require('./userRoutes');
const { cardRoutes } = require('./cardRoutes');
const { registerRoutes } = require('./registerRoutes');

const routes = express.Router();

routes.use('', registerRoutes);
routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);

exports.routes = routes;
