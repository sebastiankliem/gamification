// using amqplib to connect to rabbitmq
const amqp = require('amqplib');
const app = require('../../app');

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return [];
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }

  async sendToQueue(host, queue, message) {
    amqp.connect('amqp://' + host).then(function(conn) {
      return conn.createChannel().then(function(ch) {
        var ok = ch.assertQueue(queue, {durable: true});
        return ok.then(function(_qok) {
          ch.sendToQueue(queue, Buffer.from(message));
          return ch.close();
        });
      }).finally(function() { conn.close(); });
    }).catch(console.warn);
  }

  async sendToExchange(host, exchange, routingKey, message) {
    amqp.connect('amqp://' + host).then(function(conn) {
      return conn.createChannel().then(function(ch) {
        var ok = ch.assertExchange(exchange, 'direct', {durable: true});
        return ok.then(function() {
          ch.publish(exchange, routingKey, Buffer.from(message));
          return ch.close();
        });
      }).finally(function() { conn.close(); });
    }).catch(console.warn);
  }

  async receiveFromQueue(host, queue) {
    amqp.connect('amqp://' + host).then(function(conn) {
      process.once('SIGINT', function() { conn.close(); });
      return conn.createChannel().then(function(ch) {
        var ok = ch.assertQueue(queue, {durable: true});
        ok = ok.then(function(_qok) {
          return ch.consume(queue, function(msg) {
            console.log(JSON.parse(msg.content));            
            // here must come the event evaluation
          }, {noAck: true});
        });
        return ok.then(function(_consumeOk) {
        });
      });
    }).catch(console.warn);
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
