// Import library
const mysql = require('mysql');
const EventEmitter = require('events');

class MySQLService extends EventEmitter {
  constructor(options) {
    super();

    const {
      host,
      port,
      user,
      password,
      database,
      sql,
    } = options;

    this.host = host;
    this.port = port;
    this.user = user;
    this.password = password;
    this.database = database;

    this.santinizeHost();

    console.log(`[ MySQL ] Atempt to connect [${this.host}] with database [${this.database}]`);
    this.client = MySQL.connect(`MySQL://${this.host}`);

    // Register topic
    this.client.on('connect', () => {
      console.log(`[ MySQL ] Successfully connect to broker [${this.host}].`);
      this.client.subscribe(this.topic);
    });

    // Receive data
    this.client.on('message', (topic, message) => {
      this.emit('data', JSON.parse(message.toString()));
    });
  }

  validationConfig() {
    if (!this.host) {
      throw new Error('[ MySQL ] Host is not defined');
    }
    // TODO: To santinize host
  }

  kill() {
    console.log(`[ MySQL ] Successfully disconnect from broker [${this.host}].`);
    this.client.end();
  }
}

module.exports = MySQLService;
