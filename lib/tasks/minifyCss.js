var sass = require('./sass');

module.exports = function(gulp, plugins, config) {
  return function() {
    config.sass.minify = true;
    return sass(gulp, plugins, config)();
  }
};