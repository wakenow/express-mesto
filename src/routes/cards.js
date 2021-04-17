const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w\W.-]*)#?$/),
  }),
}), createCard);

router.delete('/:id', celebrate({
  params: Joi.object()
    .keys({
      id: Joi.string().required().length(24).hex(),
    })
    .unknown(true),
}), deleteCard);

router.put('/:id/likes', celebrate({
  params: Joi.object()
    .keys({
      id: Joi.string().required().length(24).hex(),
    })
    .unknown(true),
}), likeCard);

router.delete('/:id/likes', celebrate({
  params: Joi.object()
    .keys({
      id: Joi.string().required().length(24).hex(),
    })
    .unknown(true),
}), dislikeCard);

module.exports = router;
