const yaml = require('js-yaml');
const fs = require('fs');
const app = require('./app');
const users = require('./services/users/users.service.js');

class EventParser {
  constructor() {
    this.eventRules = yaml.safeLoad(fs.readFileSync('./config/config.yml', 'utf8')).events;
  }

  dumpConfig() {
    console.dir(this.eventRules, {depth: 5});
  }

  parse(eventMessage) {
    console.log('Parsing Event');
    console.log(eventMessage);
    let eventRule = this.eventRules[eventMessage.event_type];
    new Event(eventMessage.userID, eventMessage.payload, eventRule).evaluate();
  }
}

class Event {
  constructor(userID, payload, eventRule) {
    this.userID = userID;
    this.payload = payload;
    this.eventRule = eventRule;
    this.user = this.getUser(this.userID);
  }

  getUser(userID) {
    console.log(app);
    // console.log(app.service('users').find(user => user.user_id === userID));
  }
  
  evaluate() {
    for (let key in this.eventRule.payload) {
          //  console.log(this.eventRule.payload[key].replace('{' + key + '}', this.payload[key]));
      
    }
  }
}

module.exports = new EventParser();
