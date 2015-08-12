var browserSync = require('browser-sync');

module.exports = function(gulp, plugins, config) {
  return function() {
  	if (config.browserSync.useBrowserSync) {
  		plugins.browserSync.init(config.browserSync.settings);
    }
  };
};