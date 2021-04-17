const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUserId, updateUser, updateAvatar, getUserMe,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getUserMe);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), getUserId);

router.patch('/me', celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    })
    .unknown(true),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w\W.-]*)#?$/),
  }),
}), updateAvatar);

module.exports = router;
