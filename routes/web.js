const express = require('express');

const routes = express.Router();

app.get('/', (req, res) => {
  res.render('home')
});

module.exports = routes;