const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cardController');
const auth = require('../middlewares/auth');

const cardRoutes = express.Router();

cardRoutes.get('/', auth, celebrate({
  headers: Joi.object().keys({
    cookie: Joi.string().required(),
  }).unknown(true),
}), getCards);

cardRoutes.post('/', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);

cardRoutes.delete('/:cardId', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }).unknown(true),
}), deleteCard);

cardRoutes.put('/:cardId/likes', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }).unknown(true),
}), likeCard);

cardRoutes.delete('/:cardId/likes', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }).unknown(true),
}), dislikeCard);

exports.cardRoutes = cardRoutes;
