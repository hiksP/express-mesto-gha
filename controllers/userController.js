const mongoose = require('mongoose');
const { User } = require('../models/user');

exports.getUsers = async (req, res) => {
  const users = await User.find({});

  res.send(users);
}

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id)

  res.send(user);
}

exports.createUser = async (req, res) => {
  const user =  await User.create(req.body);

  res.send(user);
}