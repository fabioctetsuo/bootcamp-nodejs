const express = require('express');
const validate = require('express-validation');
const controllers = require('./app/controllers');
const validators = require('./app/validators');

// Middleware Imports
const { validateToken } = require('./app/middlewares/auth');

// Controller Imports
const {
  UserController, SessionController, AdController, PurchaseController,
} = controllers;

const {
  Ad, Purchase, Session, User,
} = validators;

// Router instance
const routes = express.Router();

routes.post('/users', validate(User), UserController.store);
routes.post('/sessions', validate(Session), SessionController.store);

// All routes above the following line will use valida token middleware
routes.use(validateToken);

routes.get('/ads', AdController.index);
routes.get('/ads/:id', AdController.show);
routes.post('/ads', validate(Ad), AdController.store);
routes.put('/ads/:id', validate(Ad), AdController.update);
routes.delete('/ads/:id', AdController.destroy);

routes.post('/purchases', validate(Purchase), PurchaseController.store);

module.exports = routes;
