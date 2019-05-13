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
};
