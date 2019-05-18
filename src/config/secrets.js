module.exports.secrets = {
  database: {
    project: process.env.DB_PROJECT,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  },
  auth: {
    key: process.env.AUTH_KEY,
    expiresIn: 86400,
  },
  mailer: {
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: false,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
};
