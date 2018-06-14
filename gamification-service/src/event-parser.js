const yaml = require('js-yaml');
const fs = require('fs');

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
    //new Event(eventMessage.userID, eventMessage.payload, eventRule).evaluate();
    return eventRule;
  }
}

module.exports = new EventParser();
