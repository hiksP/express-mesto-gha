const express = require('express');
const mongoose = require('mongoose');
const { routes } = require('./routes/routes');
const cookieParser = require('cookie-parser');


const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser())

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(express.json());
app.use(routes);
app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1/mestodb');

  app.listen(PORT, () => {
    console.log('etwas');
  });
}

main();
