module.exports.secrets = {
  database: {
    project: 'gonode',
    name: 'gonode',
    password: 'password',
  },
  auth: {
    key: 'key',
    expiresIn: 86400,
  },
  mailer: {
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false,
    auth: {
      user: 'user',
      pass: 'pass',
    },
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
};
