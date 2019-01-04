const fs = require('fs');
const Dashboard = require('./models/Dashboard');

module.exports = () => {
  Dashboard.count().exec((err, count) => {
    if (count > 0) return;
    // API routes
    fs.readdirSync(`${__dirname}/sample/`).forEach((file) => {
      if (file.indexOf('.js') > -1) {
        // eslint-disable-next-line
        const dashboard = new Dashboard(require(`./sample/${file.substr(0, file.indexOf('.'))}`));
        dashboard
          .save()
          .then(db => console.log(`Sample dashboard (created): ${db._id}`));
      }
    });
  });
};
