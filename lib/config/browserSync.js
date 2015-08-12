var p = require('path');
var merge = require('../util/mergeOptions.js');

module.exports = function(options) {
  var defaults = {
    useBrowserSync: true,
    before: ['watch'],
    // See http://www.browsersync.io/docs/options/ for a complete list of configuration options
    settings: {
      server: true,
      open: true,
      notify: false,
      reloadOnRestart: true,
      files: [
        p.join(options.assets.root, '**/*'),
        p.join(options.appDir, '**/*.php'),
      ]
    }
  };

  return merge('browserSync', options, defaults);
};