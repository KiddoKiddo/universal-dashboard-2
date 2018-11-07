const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  // API routes
  fs.readdirSync(`${__dirname}/api/`).forEach((file) => {
    if (file.indexOf('.js') > -1) { // js file
      // eslint-disable-next-line
      require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
    }
  });
};
