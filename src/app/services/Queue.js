const kue = require('kue');
const { secrets } = require('../../config/secrets');
const { PurchaseMail } = require('../jobs');

const { redis } = secrets;

const Queue = kue.createQueue({ redis });
Queue.process(PurchaseMail.key, PurchaseMail.handle);

module.exports = Queue;
