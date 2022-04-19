const mongoose = require('mongoose');
const { findById } = require('../models/card');
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

exports.updateUser = async (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, {name, about}, {
    new: true
  })
  .then(user => res.send({data: user}))
  .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}

exports.changeAvatar =  async (req, res) => {
 const {avatar} = req.body;
 User.findByIdAndUpdate(req.user._id, {avatar}, {
   new: true
 })
 .then(user => res.send({data: user}))
 .catch(err => res.status(500).send({message: 'Произошла ошибка'}))
}