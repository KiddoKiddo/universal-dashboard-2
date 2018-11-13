// Import library
const shortid = require('shortid');
const { RateLimiter } = require('limiter');
const _ = require('lodash');

// Import utils
const utils = require('./utils');

// Services
const MQTTService = require('./services/mqtt-service');
const MYSQLService = require('./services/mysql-service');

class ServiceManager {
  /*
  Standard format for one connection
  {
  // TODO: fill
  }
  */
  constructor() {
    this.store = {};
  }

  constructService(type = 'MQTT', options) {
    let service;
    if (type === 'MQTT') {
      service = new MQTTService(options);
    } else if (type === 'MYSQL') {
      service = new MYSQLService(options);
    }
    return service;
  }

  execService(socket, options) {
    const {
      _id,
      type,
      rate,
      rateUnit
    } = options; // _id is datasourceId

    // Create a new service for a datasource
    const service = this.constructService(type, options);
    if (!service) {
      console.log(`[ SM ] Cannot create service ${type}, ${_id}`);
    }

    // Put into store
    const serviceId = shortid();
    this.store[serviceId] = {
      serviceId,
      socket,
      service,
      ...options,
    };
    console.log('[ SM ] Size of service store: ', _.size(this.store));

    // Rate limiter
    const limiter = new RateLimiter(1, utils.getRateLimiterMilliseconds(rate, rateUnit));

    // Generic handler to send data back to client
    // _id is datasourceId
    // "data" must have format: { "id1": payload }
    service.on('data', (data) => {
      // Sampling rate using the rate limiter hence some data is missing
      if (limiter.tryRemoveTokens(1)) {
        socket.emit(_id, data);
      }
    });
    return serviceId;
  }

  killService(serviceId) {
    const serviceObject = this.store[serviceId];
    if (!serviceObject) return false;

    // Kill the service
    serviceObject.service.kill();

    // Remove from the store
    delete this.store[serviceId];

    console.log('[ SM ] Size of service store: ', _.size(this.store));

    return true;
  }
}
module.exports = ServiceManager;
