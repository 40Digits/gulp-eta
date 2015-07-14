var merge = require('../util/mergeOptions.js');

module.exports = function(options) {
  var defaults = {
    browsers: [
      'last 2 versions',
      'safari 5',
      'ie 8',
      'ie 9',
      'android 4'
    ],
    cascade: true
  };

  return merge('autoprefixer', options, defaults);
};