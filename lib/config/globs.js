var merge = require('../util/mergeOptions.js');

// The default configuration
var defaults = {
  images:   '**/*.+(png|jpg|jpeg|svg|gif)',
  scripts:  '**/*.+(js|ejs)',
  sprites:  '**/*.+(png)',
  styles:   '**/*.+(sass|scss)',
  symbols:  '*.+(svg)',
  static:   '**/*.+(html)'
};

module.exports = function(options) {
  return merge('globs', options, defaults);
};

exports.defaults = defaults;