const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Поле обязательно для заполнения'],
    minlength: [2, 'Введите не менее двух символов'],
    maxlength: [30, 'Введите не более 30 символов'],
  },
  about: {
    type: String,
    require: [true, 'Поле обязательно для заполнения'],
    minlength: [2, 'Введите не менее двух символов'],
    maxlength: [30, 'Введите не более 30 символов'],
  },
  avatar: {
    type: String,
    require: [true, 'Поле обязательно для заполнения'],
    validate: {
      validator: (v) => /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/.test(v),
      message: 'Введите ссылку',
    },
  },
});

module.exports = mongoose.model('user', userSchema);