const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
  name: String,
  datasources: [{
    name: String,
    type: {
      type: String,
      enum: ['MQTT', 'OPCUA', 'MYSQL'],
    },
    // Common properties
    rate: Number,
    rateUnit: {
      type: String,
      enum: ['ms', 's', 'm', 'h'],
    },
    url: String,
    host: String,
    port: Number,

    topics: { type: [String], default: null }, // mqtt

    username: String, // mysql
    password: String, // mysql
    database: String, // mysql
    queries: { type: [String], default: null }, // mysql
  }],
  panels: [{
    datasource: {
      name: String,
      index: Number,
    },
    title: String,
    panel: String,
    options: {},
  }],
  layout: [{
    x: Number,
    y: Number,
    w: Number,
    h: Number,
    i: String,
  }],
});

module.exports = mongoose.model('Dashboard', DashboardSchema);
