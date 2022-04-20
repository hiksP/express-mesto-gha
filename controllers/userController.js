const mongoose = require('mongoose');
const { findById } = require('../models/card');
const { User } = require('../models/user');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch(err) {
    res.status(500).send({message: "Произошла ошибка"})
  }
}

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    res.send(user);
  } catch(err) {
    res.status(404).send({message: "Пользователь не найден"})
  }
}

exports.createUser = async (req, res) => {
  try {
    const user =  await User.create(req.body);

    res.send(user);
  } catch (err) {
    res.status(400).send({message: "Переданы некорретные данные"})
  }
}

exports.updateUser = async (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, {name, about}, {
    new: true
  })
  .then(user => res.send({data: user}))
  .catch(err => res.status(500).send({message: 'Переданы некорректные данные'}))
}

exports.changeAvatar =  async (req, res) => {
 const {avatar} = req.body;
 User.findByIdAndUpdate(req.user._id, {avatar}, {
   new: true
 })
 .then(user => res.send({data: user}))
 .catch(err => res.status(500).send({message: 'Переданы некорректные данные'}))
}