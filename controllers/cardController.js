const Card = require('../models/card');
const mongoose = require('mongoose')

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch(err) {
    res.status(500).send({message: "Произошла ошибка"})
  }
};

exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
  .then(card => res.send({data: card}))
  .catch(err => res.status(500).send({message: "Произошла ошибка"}))
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(400).send({message: "Переданы некорректные данные"}))
};

exports.likeCard = async (req, res) => {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    ) .then(card => {
      if(!card) {
        res.status(404).send({message: "Карточка не найдена"})
      } else {
        res.send(card)
      }
    })
    .catch(err => {
      if(err.name === "CastError") {
        res.status(400).send({message: "Невалидный id"})
      }
    })
}

exports.dislikeCard = async (req, res) => {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .then(card => {
      if(!card) {
        res.status(404).send({message: "Карточка не найдена"})
      } else {
        res.send(card)
      }
    })
    .catch(err => {
      if(err.name === "CastError") {
        res.status(400).send({message: "Невалидный id"})
      }
    })
}