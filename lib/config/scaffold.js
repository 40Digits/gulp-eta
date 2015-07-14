var merge = require('../util/mergeOptions.js');
// The default configuration
var defaults = {
  source: {
    root:     '_src',
    images:   'images',
    scripts:  'js',
    sprites:  'sprites',
    styles:   'sass',
    symbols:  'symbols',
    static:   'static'
  },
  assets: {
    root:     'assets',
    images:   'images',
    sprites:  'images/sprites',
    scripts:  'js',
    styles:   '/',
    symbols:  'fonts/symbols',
    static:   '/'
  }
};

exports.make = function(options) {
  // merge the user scaffold with the defaults
  return merge('scaffold', options, defaults);
};

// expose the defaults
exports.defaults = defaults;