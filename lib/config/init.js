var p = require('path');
var merge = require('../util/mergeOptions.js');

module.exports = function(options) {
  // The default configuration
  var defaults = {
    srcDir: p.join(p.dirname(module.filename),'../_src'),
    cwd: options.appDir,
    manifestPath: './package.json',
    gulpfile: './gulpfile.js',
    bundlesPath: './' + options.scaffold.source.root + '/' + options.scaffold.source.scripts + '/config/bundles.js',
    dependencies: ['sassqwatch'],
    devDependencies: ['gulp', 'browserify-ejs', 'browserify-shim'],
    stuffToAppend: {
      'browserify': {
        'transform': options.browserify.transform,
      },
      'browser': options.browserify.aliases,
      'browserify-shim': options.browserify.shim
    }
  };

  return merge('init', options, defaults);
};