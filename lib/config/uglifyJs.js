var merge = require('../util/mergeOptions.js');

module.exports = function(options) {
  // The default configuration
  var defaults = {
    outputName: '',
    settings: {}
  };

  return merge('uglifyJs', options, defaults);
};