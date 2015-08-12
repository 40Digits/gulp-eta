var browserSync = require('browser-sync');

module.exports = function(gulp, plugins, config) {
  return function() {
		browserSync.init(config.browserSync.settings);
  };
};
