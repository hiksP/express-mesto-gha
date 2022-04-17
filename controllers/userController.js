const card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link, userId } = req.body;

  card.create({ name, link, owner: userId })
    .then(card => res.send({ data: card }));
};
