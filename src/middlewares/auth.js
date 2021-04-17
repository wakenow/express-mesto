/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/authorized-err.js');

const JWT_SECRET = 'wakenow.yandex';

function getcookie(req) {
  const { cookie } = req.headers;
  if (cookie) {
    const values = cookie.split(';').reduce((res, item) => {
      const data = item.trim().split('=');
      return { ...res, [data[0]]: data[1] };
    }, {});
    return values;
  }
  return undefined;
}

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Ошибка авторизации');
  }
  const cookies = getcookie(req);
  if (!cookies) {
    throw new UnauthorizedError('Ошибка авторизации');
  } else {
    const token = cookies.jwt;
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      throw new UnauthorizedError('Ошибка авторизации');
    }

    req.user = payload;

    next();
  }
};
