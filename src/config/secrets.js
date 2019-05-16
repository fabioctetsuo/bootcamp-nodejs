module.exports.secrets = {
  database: {
    project: 'gonode',
    name: 'gonode',
    password: 'teste',
  },
  auth: {
    key: 'GoNode03',
    expiresIn: 86400,
  },
  mailer: {
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false,
    auth: {
      user: '9ad0c8f1cc51d7',
      pass: '482a353c4bd53f',
    },
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
};
