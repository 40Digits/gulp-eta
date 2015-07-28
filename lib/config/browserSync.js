var p = require('path'),
    merge = require('../util/mergeOptions.js');

module.exports = function(options) {
  // See http://www.browsersync.io/docs/options/ for a complete list of configuration options
  var defaults = {
    server: true,
    open: true,
    notify: false,
    reloadOnRestart: true,
    files: [
      p.join(options.assets.root, '**/*.*'),
      p.join(options.appDir, '**/*.php'),
      p.join(options.appDir, '**/*.css'),
      p.join(options.appDir, '**/*.html')
    ]
  };

  return merge('browserSync', options, defaults);
}