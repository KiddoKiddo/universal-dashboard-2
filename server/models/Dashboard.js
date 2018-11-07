const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
  name: String,
  datasources: [{
    name: String,
    type: {
      type: String,
      enum: ['mqtt', 'opcua', 'mysql'],
    },
    host: String, // mqtt, mysql
    port: Number, // mqtt, mysql
    topic: String, // mqtt
    user: String, // mysql
    password: String, // mysql
    database: String, // mysql
    rate: Number,
    rateUnit: {
      type: String,
      enum: ['ms', 's', 'm'],
    },
  }],
  panels: [{
    dsName: String,
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
