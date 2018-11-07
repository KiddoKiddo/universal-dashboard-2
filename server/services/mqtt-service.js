// Import library
const mqtt = require('mqtt');
const EventEmitter = require('events');

class MQTTService extends EventEmitter {
  constructor(options) {
    super();

    const { host, topic } = options;

    this.host = host;
    this.topic = topic;

    this.santinizeHost();
    this.santinizeTopic();

    console.log(`[ MQTT ] Atempt to connect [${this.host}] with topic [${this.topic}]`);
    this.client = mqtt.connect(`mqtt://${this.host}`);

    // Register topic
    this.client.on('connect', () => {
      console.log(`[ MQTT ] Successfully connect to broker [${this.host}].`);
      this.client.subscribe(this.topic);
    });

    // Receive data
    this.client.on('message', (topic, message) => {
      this.emit('data', JSON.parse(message.toString()));
    });
  }

  santinizeHost() {
    if (!this.host) {
      throw new Error('[ MQTT ] Host is not defined');
    }
    this.host = this.host.replace('mqtt://', '');
  }

  santinizeTopic() {
    if (!this.topic) {
      throw new Error('[ MQTT ] Topic is not defined');
    }
  }

  kill() {
    console.log(`[ MQTT ] Successfully disconnect from broker [${this.host}].`);
    this.client.end();
  }
}

module.exports = MQTTService;
