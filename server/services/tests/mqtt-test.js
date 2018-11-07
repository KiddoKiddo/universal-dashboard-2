const mqtt = require('mqtt');
const moment = require('moment');

// Testing broker
const client = mqtt.connect('mqtt://localhost');

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

client.on('connect', () => {
  setInterval(() => {
    client.publish('ud-status', JSON.stringify({
      machine: 1,
      status: getRandomInt(3),
    }));

    client.publish('ud-points', JSON.stringify({
      time: moment().format(),
      data: Array.from(new Array(6), () => getRandomInt(100)),
    }));
  }, 500);
});
