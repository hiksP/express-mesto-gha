const express = require('express');
const path = require('path')
const { routes } = require('./routes/routes');
const mongoose = require('mongoose');

const { PORT = 3000} = process.env;

const PUBLIC_FOLDER = path.join(__dirname, 'public');

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
})

app.use(express.static(PUBLIC_FOLDER));

app.use(routes);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');

  app.listen(PORT, () => {
    console.log('etwas')
  });
}

main();