const express = require('express');
const {getCards, deleteCard, createCard} = require('../controllers/cardController');

const cardRoutes = express.Router();

cardRoutes.get('/', getCards);
cardRoutes.post('/', createCard);
cardRoutes.delete('/:cardId', deleteCard);

exports.cardRoutes = cardRoutes;