// Import library
const mysql = require('mysql');
const EventEmitter = require('events');
const _ = require('lodash');

// Import utils
const utils = require('../utils');

class MySQLService extends EventEmitter {
  constructor(options) {
    super();

    const {
      host,
      port,
      username,
      password,
      database,
      queries,
      rate,
      rateUnit,
    } = options;

    // this.url = url;
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
    this.database = database;
    this.queries = queries;
    this.data = {};

    this.validateUrl();
    this.validationConfig();

    console.log(`[ MySQL ] Atempt to connect [${this.host}] with database [${this.database}]`);
    this.connection = mysql.createConnection({
      host: this.host,
      user: this.username,
      password: this.password,
      database: this.database,
    });

    this.connection.connect((err) => {
      if (err) {
        console.error(`[ MySQL ] error connecting: ${err.stack}`);
        return;
      }
      // Immediate execute one time before setting the interval
      this.executeQueriesAndSendData();

      this.interval = setInterval(() => {
        this.executeQueriesAndSendData();
      }, utils.getRateLimiterMilliseconds(rate, rateUnit));
    });
  }

  executeQueriesAndSendData() {
    let count = this.queries.length;
    this.queries.forEach((query, index) => {
      this.connection.query(query, (error, results) => {
        if (error) {
          console.log(`[ MySQL ] ${error}`);
          this.connection.connect();
          return;
        }

        // Combine the data
        _.assignIn(this.data, { [`id${index}`]: results });

        // Send data once all the queries done
        if (--count === 0) {
          this.emit('data', this.data);
        }
      });
    });
  }

  validateUrl() {
    if (!_.isNil(this.url)) {
      this.url = this.url.replace('mysql://', '');
      return;
    }
    if (_.isNil(this.host)) {
      throw new Error('[ MQTT ] Both url and host is not defined');
    }
    this.host = this.host.replace('mysql://', '');
    this.port = this.port || 3306;
    this.url = `${this.host}:${this.port}`;
  }

  validationConfig() {
    // TODO: Validate username, password, database, queries
  }

  kill() {
    console.log(`[ MySQL ] Successfully disconnect from database [${this.url}].`);
    this.connection.end();
    clearInterval(this.interval);
  }
}

module.exports = MySQLService;
