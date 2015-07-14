var merge = require('../util/mergeOptions.js');

module.exports = function(options) {
  // The default configuration
  var defaults = {
    settings: {
      progressive: true,
      optimizationLevel: 4
    }
  };
  
  return merge('images', options, defaults);
};