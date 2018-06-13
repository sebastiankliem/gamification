const achievements = require('./achievements/achievements.service.js');
const amqpConnector = require('./amqp-connector/amqp-connector.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(achievements);
  app.configure(amqpConnector);
};
