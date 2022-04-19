const express = require('express');
const {getCards, deleteCard, createCard, likeCard, dislikeCard} = require('../controllers/cardController');

const cardRoutes = express.Router();

cardRoutes.get('/', getCards);

cardRoutes.post('/', express.json(), createCard);

cardRoutes.delete('/:cardId', express.json(), deleteCard);

cardRoutes.put('/:cardId/likes', likeCard);

cardRoutes.delete('/:cardId/likes', dislikeCard);

exports.cardRoutes = cardRoutes;