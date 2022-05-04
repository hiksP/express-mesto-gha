const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const wrongAuthError = require('../errors/wrong-auth-err');
const wrongReqErorr = require('../errors/wrong-req-err');
const noRightsError = require('../errors/no-rights-err');

exports.getCards = async (req, res, next) => {
  console.log(req.headers);
  try {
    const cards = await Card.find({});
    if (!cards) {
      throw new NotFoundError('Карточек нет :(');
    } else {
      res.send(cards);
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else if (card.owner.toString() === req.user.id) {
        card.remove();
        res.send({ data: card });
      } else {
        throw new noRightsError('Недостаточно прав');
      }
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user.id })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

exports.likeCard = async (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    } else {
      res.send(card);
    }
  })
    .catch(next);
};

exports.dislikeCard = async (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else {
        res.send(card);
      }
    })
    .catch(next);
};
