// Package Import
const express = require('express');

// Controller Imports
const UserController = require('./app/controllers/UserController');

// Router instance
const routes = express.Router();

routes.get('/', (req, res) => res.json({
  message: 'hello world',
}));

routes.post('/users', UserController.store);

module.exports = routes;
