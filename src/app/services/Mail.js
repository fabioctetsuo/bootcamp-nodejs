const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
const exphbs = require('express-handlebars');
const { secrets } = require('../../config/secrets');

const { mailer } = secrets;
const transport = nodemailer.createTransport(mailer);

const viewPath = path.resolve(__dirname, '..', 'views', 'emails');

transport.use(
  'compile',
  hbs({
    viewEngine: exphbs.create({
      partialsDir: path.resolve(viewPath, 'partials'),
    }),
    viewPath,
    extName: '.hbs',
  }),
);

module.exports = transport;
