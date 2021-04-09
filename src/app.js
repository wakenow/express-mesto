const express = require('express');
const routerUser = require('./routes/indexUser');
const routerCard = require('./routes/indexCard');
const helmet = require('helmet');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const app = express();
app.use((req, res, next) => {
  req.user = {
    _id: '607075e5322747507842244f',
  };

  next();
});

app.use(helmet());
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(routerUser);
app.use(routerCard);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен');
});