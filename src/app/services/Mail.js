const nodemailer = require('nodemailer');
const { secrets } = require('../../config/secrets');

const { mailer } = secrets;
const transport = nodemailer.createTransport(mailer);

module.exports = transport;
