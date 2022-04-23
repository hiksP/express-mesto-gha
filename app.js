const express = require('express');
const mongoose = require('mongoose');
const { routes } = require('./routes/routes');

const { PORT = 3000 } = process.env;

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '625c676597f3047639f7e6b8',
  };

  next();
});

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(express.json());
app.use(routes);
app.use((req, res) => {
  res.status(404).send({ message: 'Данной страницы не существует' });
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');

  app.listen(PORT, () => {
    console.log('etwas');
  });
}

main();
