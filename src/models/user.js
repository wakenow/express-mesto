const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UnauthorizedError = require('../errors/authorized-err.js');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Введите не менее двух символов'],
    maxlength: [30, 'Введите не более 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Введите не менее двух символов'],
    maxlength: [30, 'Введите не более 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w\W.-]*)#?$/g.test(v),
      message: 'Введите корректный URL',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
    unique: true,
    validate: {
      validator: (v) => /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(v),
      message: 'Введите email',
    },
  },
  password: {
    type: String,
    required: [true, 'Обязательное поле для заполнения'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные email или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные email или пароль');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
