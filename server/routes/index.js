const contentRoutes = require('./content_routes');

module.exports = function(app, db) {
  contentRoutes(app, db);
  // Other route groups could go here, in the future
};