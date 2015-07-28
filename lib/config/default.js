var merge = require('../util/mergeOptions.js');

module.exports = function(options) {
  var defaults = {
    tasks: ['browserSync', 'symbols', 'sass', 'sprites', 'images', 'browserify']
  };

  return merge('default', options, defaults);
};