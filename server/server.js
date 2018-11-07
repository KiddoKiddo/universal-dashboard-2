const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Mongoose Config
const config = require('../config/config');

const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 8080;

// Configuration
// ================================================================================================

// Set up Mongoose
const mongoConfig = isDev ? config.db_dev : config.db;
mongoose.connect(mongoConfig);
mongoose.Promise = global.Promise;
mongoose.connection.on('connected', () => {
  console.log(`Successfully connect to ${mongoConfig}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`mongoose connection err: ${err}`);
});

// Express init
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Service manager init
const ServiceManager = require('./service-manager');

const serviceManager = new ServiceManager();

// Socket.io to aliase with socket io
const http = require('http').Server(app); // eslint-disable-line
const io = require('socket.io')(http); // eslint-disable-line
require('./socket')(io, serviceManager);

// API routes
require('./routes')(app);

// Webpack
require('./webpack')(app, isDev);

// Starting express (changed from app to server for socket to work)
http.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.info('>>> 🌎 Open http://0.0.0.0:%s/ in your browser.', port);
});

module.exports = app;
