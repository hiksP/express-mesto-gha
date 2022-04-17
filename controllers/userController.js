const mongoose = require('mongoose');
const { User } = require('../models/user');

exports.getUsers = async (req, res) => {
  const users = await User.find({});

  res.send(users);
}

exports.getUserById = (req, res) => {
  res.send(User.find((item) => item._id === req.params.id));
}

exports.createUser = async (req, res) => {
  const user =  await User.create(req.body);

  res.send(user);
}