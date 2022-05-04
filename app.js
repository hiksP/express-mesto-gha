const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { routes } = require('./routes/routes');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(express.json());
app.use(routes);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.name === 'CastError') {
    res.status(400).send({ message: 'Невалидный id ' });
  } else if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Переданы некорректные данные' });
  } else {
    res
      .status(statusCode)
      .send({
        message: statusCode === 500
          ? 'На сервере произошла ошибка'
          : message,
      });
  }
  next();
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1/mestodb');

  app.listen(PORT, () => {
    console.log('etwas');
  });
}

main();
