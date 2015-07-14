var merge = require('../util/mergeOptions.js');

module.exports = function(options) {
  // The default configuration
  var defaults = {
    extension: ".html",
    // see https://www.npmjs.com/package/gulp-file-include for available settings
    settings: {
      prefix: '@@',
      basepath: '@file'
    },
  };

  return merge('static', options, defaults);
};