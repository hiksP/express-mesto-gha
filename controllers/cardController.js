const Card = require('../models/card');

exports.getCards = async (req, res) => {
  const cards = await Card.find({});

  res.send(cards);
};

exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
  .then(card => res.send({data: card}))
  .catch(err => res.status(500).send({message: "Произошла ошибка"}))
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(card => res.send({ data: card }));
};

exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
}

exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
}