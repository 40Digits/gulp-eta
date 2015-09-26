/*
  index.js
  ===========
  Returns gulp tasks to a parent app
*/

var p = require('path');
var plugins = require('gulp-load-plugins')({ lazy: true });
var setupTasks = require('./lib/util/setupTasks.js');
var config = require('./lib/config.js');

module.exports = function(gulp, options) {
  var appDir = p.dirname(module.parent.filename);

  // fallback to the app's package.json
  // options if nothing has been passed in
  if (!options) {
    var package = require(p.join(appDir, 'package.json'));
    options = package.eta ? package.eta : {};
  }

  // return gulp with our tasks
  return setupTasks(gulp, plugins, config(options, appDir));
};
