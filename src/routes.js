// Package Import
const express = require('express');

// Router instance
const routes = express.Router();

routes.get('/', (req, res) => res.json({
  message: 'hello world',
}));

module.exports = routes;
