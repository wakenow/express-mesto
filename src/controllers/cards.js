const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err.js');
const BadRequestError = require('../errors/bad-request-err.js');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (req.user._id.toString() === card.owner.toString()) {
        card.remove();
        res.status(200).send({ message: 'Карточка удалена' });
      }
      throw new BadRequestError('Нельзя удалить чужую карточку');
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки с таким ID не существует');
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(id, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки с таким ID не существует');
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
