var merge = require('../util/mergeOptions.js');

module.exports = function(options) {
  // The default configuration
  var defaults = {
    settings: {
      indentedSyntax: true,
      errLogToConsole: true,
      outputStyle: 'nested'
    },
    globbing: {
      extensions: ['.scss', '.sass']
    }
  };

  return merge('sass', options, defaults);
};