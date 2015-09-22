var merge = require('../util/mergeOptions.js');

module.exports = function(options) {
  var defaults = {
    tasks: ['minifyCss', 'uglifyJs']
  };

  return merge('production', options, defaults);
};