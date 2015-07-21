var p = require('path');
var merge = require('../util/mergeOptions.js');

module.exports = function(options) {
  // The default configuration
  var defaults = {
    debug: false,
    bundles: [],
    bundleConfig: p.join(options.source.scripts, 'config/bundles.js'),
    uglify: false,
    transform: ['browserify-shim', 'browserify-ejs'],
    aliases: {
      "waitFor": './' + p.join(options.scaffold.source.root, options.scaffold.source.scripts, "/lib/waitFor.js")
    },
    shim: { "jquery": "global:$" }
  };

  return merge('browserify', options, defaults);
};