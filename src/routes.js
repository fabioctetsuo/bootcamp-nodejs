const express = require('express');
const controllers = require('./app/controllers');

// Middleware Imports
const { validateToken } = require('./app/middlewares/auth');

// Controller Imports
const { UserController, SessionController } = controllers;

// Router instance
const routes = express.Router();

routes.get('/', validateToken, (req, res) => res.json({
  message: 'hello world',
}));

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

module.exports = routes;
