const express = require('express');
const path = require('path')
const { routes } = require('./routes/routes');

const { PORT = 3000} = process.env;

const PUBLIC_FOLDER = path.join(__dirname, 'public');

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
})

app.use(express.static(PUBLIC_FOLDER));

app.use(routes);

app.listen(PORT, () => {
  console.log('etwas')
});