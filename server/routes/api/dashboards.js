const assign = require('deep-assign');
const Dashboard = require('../../models/Dashboard');

const route = 'dashboard';

module.exports = (app) => {
  // Get info of one dashboard
  app.get(`/api/${route}/:id`, (req, res, next) => {
    Dashboard.findById(req.params.id)
      .exec()
      .then(dashboard => res.json(dashboard))
      .catch(err => next(err));
  });

  // Create new dashboard
  app.post(`/api/${route}`, (req, res, next) => {
    const config = req.body;
    if (!config) {
      return res.status(404).send({ message: 'No config is received.' });
    }
    const dashboard = new Dashboard(config);

    dashboard.save()
      .then(() => res.json(dashboard))
      .catch(err => next(err));
  });

  // Delete dashboard
  app.delete(`/api/${route}/:id`, (req, res, next) => {
    Dashboard.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then(() => res.json())
      .catch(err => next(err));
  });

  // Update dashboard
  app.put(`/api/${route}/:id`, (req, res, next) => {
    Dashboard.findById(req.params.id)
      .exec()
      .then((dashboard) => {
        assign(dashboard, req.body);
        dashboard.save()
          .then(() => res.json(dashboard))
          .catch(err => next(err));
      })
      .catch(err => next(err));
  });
};
