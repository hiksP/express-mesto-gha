const express = require('express');
const path = require('path')
const { routes } = require('./routes/routes');
const mongoose = require('mongoose');

const { PORT = 3000} = process.env;

const PUBLIC_FOLDER = path.join(__dirname, 'public');

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '625c676597f3047639f7e6b8'
  };

  next();
});

app.use(( req, res, next) => {
  console.log(req.method, req.path);
  next();
})

app.use(express.static(PUBLIC_FOLDER));

app.use(express.json());
app.use(routes);
app.use((req, res) => {
  res.status(404).send({ message: "Данной страницы не существует" });
  });

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');

  app.listen(PORT, () => {
    console.log('etwas')
  });
}

main();