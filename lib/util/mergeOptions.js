var merge = require('../util/deepishMerge');

module.exports = function(property, options, defaults) {
  if (options[property]) {
    return merge(defaults, options[property]);
  } else {
    return defaults;
  }
}