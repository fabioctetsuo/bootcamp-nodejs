const kue = require('kue');
const Sentry = require('@sentry/node');
const { secrets } = require('../../config/secrets');
const { PurchaseMail } = require('../jobs');

const { redis } = secrets;

const Queue = kue.createQueue({ redis });

Queue.process(PurchaseMail.key, PurchaseMail.handle);
Queue.on('error', Sentry.captureException);

module.exports = Queue;
