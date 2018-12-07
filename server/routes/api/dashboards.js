const Dashboard = require('../../models/Dashboard');
const DashboardUtils = require('../../utils/dashboardUtils');
const _ = require('lodash');

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
      res.status(404).send({ message: 'No config is received.' });
    }

    const validateConfig = DashboardUtils.validateConfig(config);
    const dashboard = new Dashboard(validateConfig);

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
        if (!dashboard) {
          res.status(404).send({ message: `There is no config with id ${req.params.id}` });
        }
        _.assignIn(dashboard, req.body);
        dashboard.save()
          .then(() => res.json(dashboard))
          .catch(err => next(err));
      })
      .catch(err => next(err));
  });

  // Add datasoures
  app.post(`/api/${route}/:id/datasources`, (req, res, next) => {
    Dashboard.findById(req.params.id)
      .exec()
      .then((dashboard) => {
        if (!dashboard) {
          res.status(404).send({ message: `There is no config with id ${req.params.id}` });
        }
        dashboard.datasources.push(req.body);
        dashboard.save()
          .then(() => res.json(dashboard))
          .catch(err => next(err));
      })
      .catch(err => next(err));
  });

  // Add panels
  app.post(`/api/${route}/:id/panels`, (req, res, next) => {
    Dashboard.findById(req.params.id)
      .exec()
      .then((dashboard) => {
        if (!dashboard) {
          res.status(404).send({ message: `There is no config with id ${req.params.id}` });
        }
        dashboard.panels.push(req.body);
        dashboard.save()
          .then(() => res.json(dashboard))
          .catch(err => next(err));
      })
      .catch(err => next(err));
  });

  // Update panels
  app.put(`/api/${route}/:id/panels/:panelId`, (req, res, next) => {
    Dashboard.findById(req.params.id)
      .exec()
      .then((dashboard) => {
        if (!dashboard) {
          res.status(404).send({ message: `There is no config with id ${req.params.id}` });
          return;
        }

        const panelIndex = _.findIndex(dashboard.panels, (p) => { return p._id.toString() === req.params.panelId; });
        if (panelIndex < 0) {
          res.status(404).send({ message: `There is no panel with id ${req.params.panelId}` });
        }
        dashboard.panels.splice(panelIndex, 1, Object.assign(req.body, { _id: req.params.panelId }));

        dashboard.save()
          .then(() => res.json(_.findIndex(dashboard.panels, (p) => { return p._id.toString() === req.params.panelId; })))
          .catch(err => next(err));
      })
      .catch(err => next(err));
  });
};
