const express = require('express');
const mongoose = require('mongoose');
const { ValidationError } = require('express-validation');
const Youch = require('youch');

const databaseConfig = require('./config/database');
const routes = require('./routes');

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== 'production';

    // Inicialiando configuração de middlewares, views e rotas
    this.database();
    this.middlewares();
    this.routes();
    this.exception();
  }

  database() {
    mongoose.connect(databaseConfig.url, {
      useCreateIndex: true,
      useNewUrlParser: true,
    });
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(routes);
  }

  exception() {
    this.express.use(async (error, req, res, next) => {
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
