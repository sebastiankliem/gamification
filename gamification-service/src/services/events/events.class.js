const eventParser = require('../../event-parser');

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  }

  async create (data, params) {
    let eventRule = eventParser.parse(data);
    let event = new Event(data.userID, data.payload, eventRule, this.app);
    let user = await event.getUser();
    console.log(user);

    return data;
  }
}

class Event {
  constructor(userID, payload, eventRule, app) {
    this.userID = userID;
    this.payload = payload;
    this.eventRule = eventRule;
    this.app = app;
    // this.user = this.getUser(this.userID);
    // console.log(this.user);
  }

  async getUser() {
    var uid = this.userID;
    return (await this.app.service('users').find({
      query: { $where: 'this.user_id === "' + uid + '"'}
    })).data[0];
  }
  
  evaluate() {
    for (let key in this.eventRule.payload) {
          //  console.log(this.eventRule.payload[key].replace('{' + key + '}', this.payload[key]));
      
    }
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
module.exports.Event = Event;
