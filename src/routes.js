const express = require('express');
const validate = require('express-validation');
const handle = require('express-async-handler');
const controllers = require('./app/controllers');
const validators = require('./app/validators');

// Middleware Imports
const { validateToken } = require('./app/middlewares/auth');

// Controller Imports
const {
  UserController,
  SessionController,
  AdController,
  PurchaseController,
  AcquisitionController,
} = controllers;

const {
  Ad, Purchase, Session, User,
} = validators;

// Router instance
const routes = express.Router();

routes.post('/users', validate(User), handle(UserController.store));
routes.post('/sessions', validate(Session), handle(SessionController.store));

// All routes above the following line will use valida token middleware
routes.use(validateToken);

routes.get('/ads', handle(AdController.index));
routes.get('/ads/:id', handle(AdController.show));
routes.post('/ads', validate(Ad), handle(AdController.store));
routes.put('/ads/:id', validate(Ad), handle(AdController.update));
routes.delete('/ads/:id', handle(AdController.destroy));

routes.post('/purchases', validate(Purchase), handle(PurchaseController.store));

routes.post('/acquisitions', handle(AcquisitionController.store));

module.exports = routes;
