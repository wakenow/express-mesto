const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
    minlength: [2, 'Введите не менее двух символов'],
    maxlength: [30, 'Введите не более 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
    validate: {
      validator: (v) => /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w\W.-]*)#?$/g.test(v),
      message: 'Введите ссылку',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
