/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);
const eventParser = require('./event-parser');

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () => {
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port);
  app.service('amqp-connector').receiveFromQueue(app.get('host'), app.get('rabbitQueue'));
  eventParser.dumpConfig();
});
