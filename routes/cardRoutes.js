const express = require('express');
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cardController');
const auth = require('../middlewares/auth');

const cardRoutes = express.Router();

cardRoutes.get('/', auth, getCards);

cardRoutes.post('/', auth, createCard);

cardRoutes.delete('/:cardId', auth, deleteCard);

cardRoutes.put('/:cardId/likes', auth, likeCard);

cardRoutes.delete('/:cardId/likes', auth, dislikeCard);

exports.cardRoutes = cardRoutes;
