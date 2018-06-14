const achievements = require('./achievements/achievements.service.js');
const users = require('./users/users.service.js');
const amqpConnector = require('./amqp-connector/amqp-connector.service.js');
const events = require('./events/events.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(amqpConnector);
  app.configure(achievements);
  app.configure(users);
  app.configure(events);
};
