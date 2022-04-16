const express = require('express');

const userRoutes = express.Router();

userRoutes.get('/', (req, res) => {
  res.send('Hell world');
});

userRoutes.get('/:id', (req, res) => {
  res.send('Single user');
});

userRoutes.post('/', express.json(), (req, res) => {
  res.send(req.body);
});

exports.userRoutes = userRoutes;