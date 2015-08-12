/*
  index.js
  ===========
  Returns gulp tasks to a parent app
*/

var p = require('path');
var plugins = require('gulp-load-plugins')({ lazy: true });
var defaultConfig = require('./lib/config');
var setupTasks = require('./lib/util/setupTasks.js');
var config = {};

module.exports = function(gulp, options) {
  // setup the options object if one hasn't been defined
  options = options ? options : {};
  // set the base dir of the parent app
  options.appDir = p.dirname(module.parent.filename);
  // get the merged config
  config = defaultConfig(options);

  // Return Gulp with our Tasks
  return setupTasks(gulp, plugins, config);
};
