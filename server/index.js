'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router/router');
const { HOST, PORT } = require('./config');
const path = require('path');

const app = new express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(router);

if (process.env.NODE_ENV === 'production') {
  // app.use(express.static('client/build'));
  const publicPath = path.join(__dirname, '..', 'public');
  app.use(express.static(publicPath));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '..', 'client', 'build', 'index.html')
    );
  });
}

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`📣 App listening on http://${HOST}:${PORT}`);
});

module.exports = app;
