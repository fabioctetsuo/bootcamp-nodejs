const express = require('express');
const controllers = require('./app/controllers');

// Middleware Imports
const { validateToken } = require('./app/middlewares/auth');

// Controller Imports
const { UserController, SessionController, AdController } = controllers;

// Router instance
const routes = express.Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// All routes above the following line will use valida token middleware
routes.use(validateToken);

routes.get('/ads', AdController.index);
routes.get('/ads/:id', AdController.show);
routes.post('/ads', AdController.store);
routes.put('/ads/:id', AdController.update);
routes.delete('/ads/:id', AdController.destroy);

module.exports = routes;
