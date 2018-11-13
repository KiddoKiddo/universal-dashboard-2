// Import library
const mqtt = require('mqtt');
const { RateLimiter } = require('limiter');
const EventEmitter = require('events');
const _ = require('lodash');

// Import utils
const utils = require('../utils');

class MQTTService extends EventEmitter {
  constructor(options) {
    super();

    const {
      url,
      host,
      port,
      topics,
      rate,
      rateUnit,
    } = options;

    // Initialize
    this.url = url; // format for this.url should be without mqtt://
    this.host = host;
    this.port = port;
    this.topics = topics;
    this.data = {};

    this.validateUrl();
    this.validateTopics();

    console.log(`[ MQTT ] Atempt to connect [${this.url}] with topic [${this.topics}]`);
    this.client = mqtt.connect(`mqtt://${this.url}`);

    // Register topics
    this.client.on('connect', () => {
      console.log(`[ MQTT ] Successfully connect to broker [${this.url}].`);
      this.topics.forEach(topic => this.client.subscribe(topic));
    });

    // Rate limiter
    const limiter = new RateLimiter(1, utils.getRateLimiterMilliseconds(rate, rateUnit));

    // Receive data
    this.client.on('message', (topic, message) => {
      const index = this.topics.indexOf(topic);
      if (!_.isNil(index)) {
        _.assignIn(this.data, { [`id${index}`]: JSON.parse(message.toString()) });

        if (limiter.tryRemoveTokens(1)) {
          this.emit('data', this.data);
        }
      }
    });
  }

  validateUrl() {
    if (!_.isNil(this.url)) {
      this.url = this.url.replace('mqtt://', '');
      return;
    }
    if (_.isNil(this.host)) {
      throw new Error('[ MQTT ] Both url and host is not defined');
    }
    this.host = this.host.replace('mqtt://', '');
    this.port = this.port || 1883;
    this.url = `${this.host}:${this.port}`;
  }

  validateTopics() {
    if (!this.topics || this.topics.length === 0) {
      throw new Error('[ MQTT ] No topic is not defined');
    }
  }

  kill() {
    console.log(`[ MQTT ] Successfully disconnect from broker [${this.url}].`);
    this.client.end();
  }
}

module.exports = MQTTService;
