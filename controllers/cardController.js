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

  Card.create({ name, link })
    .then(card => res.send({ data: card }));
};
