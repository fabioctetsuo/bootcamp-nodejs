const { secrets } = require('./secrets');

const {
  database: { project, password, name },
} = secrets;

module.exports = {
  url: `mongodb+srv://${project}:${password}@cluster0-scayo.mongodb.net/${name}?retryWrites=true`,
};
