const mqtt = require('mqtt');
const moment = require('moment');
const _ = require('lodash');

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

    const reasonCodes = ['The machine is heated.', 'The machine is stopped.', 'Machine is running well.'];
    client.publish('seasl', JSON.stringify({
      machineName: `NTX1000 - ${getRandomInt(2)}`,
      operatorName: 'Tan Han Jin',
      reasonCode: _.sample(reasonCodes),
      shift: getRandomInt(2),
      status: getRandomInt(4), // { "0": "Stop", "1": "Run", "2": "Idle", "3": "Setup" },
      stopTime: getRandomInt(4),
      runTime: getRandomInt(4),
      idleTime: getRandomInt(4),
      setupTime: getRandomInt(4),
      upTime: getRandomInt(4),
      downTime: getRandomInt(4),
    }));
  }, 500);
});

console.log('Test data generator for MQTT starting.');
