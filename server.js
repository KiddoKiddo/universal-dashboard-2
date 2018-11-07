const nodemon = require('nodemon');
const path = require('path');

nodemon({
  execMap: {
    js: 'node',
  },
  script: path.join(__dirname, 'server/server'),
  ignore: [],
  watch: process.env.NODE_ENV !== 'production' ? ['server/*'] : false,
  ext: 'js',
  delay: 2500,
})
  .on('restart', () => {
    console.log('🤨🤨🤨 Server restarted!');
  })
  .once('exit', () => {
    // child process has cleanly exited (ie. no crash)
  });

// TEMP: Fix the nodemon on exit but leave the process running
process
  // Handle normal exits
  .on('exit', (code) => {
    nodemon.emit('quit');
    process.exit(code);
  })

  // Handle CTRL+C
  .on('SIGINT', () => {
    nodemon.emit('quit');
    process.exit(0);
  });
