// Initializes the `achievements` service on path `/achievements`
const createService = require('feathers-mongoose');
const createModel = require('../../models/achievements.model');
const hooks = require('./achievements.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/achievements', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('achievements');

  service.hooks(hooks);
};
