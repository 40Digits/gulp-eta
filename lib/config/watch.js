var merge = require('../util/mergeOptions.js');

module.exports = function(options) {
  var defaults = {
    scripts:  'browserify',
    styles:   'sass',
    symbols:  'symbols',
    images:   'images',
    sprites:  'sprites',
    static:   'static'
  };

  return merge('watch', options, defaults);
};