const assert = require('assert');
const app = require('../../src/app');

describe('\'AmqpConnector\' service', () => {
  it('registered the service', () => {
    const service = app.service('amqp-connector');

    assert.ok(service, 'Registered the service');
  });
});
