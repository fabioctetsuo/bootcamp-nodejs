const express = require('express');
const mongoose = require('mongoose');
const { ValidationError } = require('express-validation');
const Youch = require('youch');
const Sentry = require('@sentry/node');

const databaseConfig = require('./config/database');
const routes = require('./routes');
const { secrets: { sentry } } = require('./config/secrets');

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== 'production';

    // Inicialiando configuração de middlewares, views e rotas
    this.sentry();
    this.database();
    this.middlewares();
    this.routes();
    this.exception();
  }

  sentry() {
    Sentry.init(sentry);
  }

  database() {
    mongoose.connect(databaseConfig.url, {
      useCreateIndex: true,
      useNewUrlParser: true,
    });
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(Sentry.Handlers.requestHandler());
  }

  routes() {
    this.express.use(routes);
  }

  exception() {
    if (process.env.NODE_ENV === 'prodution') {
      this.express.use(Sentry.Handlers.errorHandler());
    }
    this.express.use(async (error, req, res, next) => { //eslint-disable-line
      const status = error.status ? error.status : 500;
      if (error instanceof ValidationError) {
        return res.status(status).json(error);
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(error);
        return res.json(await youch.toJSON());
      }

      return res.status(status).json({ error: 'Internal Server Error' });
    });
  }
}

module.exports = new App().express;
