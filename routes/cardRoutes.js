const express = require('express');
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cardController');
const auth = require('../middlewares/auth');
const { celebrate, Joi } = require('celebrate');

const cardRoutes = express.Router();

cardRoutes.get('/', auth, getCards);

cardRoutes.post('/', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required()
  }),
}), createCard);

cardRoutes.delete('/:cardId', auth, deleteCard);

cardRoutes.put('/:cardId/likes', auth, likeCard);

cardRoutes.delete('/:cardId/likes', auth, dislikeCard);

exports.cardRoutes = cardRoutes;
