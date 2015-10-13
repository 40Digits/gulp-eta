var merge = require('../util/mergeOptions.js');

module.exports = function(options) {
  // The default configuration
  var defaults = {
    reporterConfig: {
      verbose: true
    }
  };

  return merge('jshint', options, defaults);
};