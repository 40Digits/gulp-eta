/*
  index.js
  ===========
  Returns gulp tasks to a parent app
*/

var p = require('path');
var plugins = require('gulp-load-plugins')({ lazy: true });
var browserSync = require('browser-sync');
var tasks = require('./lib/tasks');
var setupConfig = require('./lib/config/setup.js');

module.exports = function(gulp, options) {
  // A convenience function to return a gulp task
  var getTask = function(task, config) {
    return tasks[task](gulp, plugins, config);
  };
  var config = {};

  // add browser-sync to the plugins so that it can be injected
  // into all of the dependencies
  plugins.browserSync = browserSync;
  
  // Setup the config from the user options
  options = options ? options : {};
  options.appDir = p.dirname(module.parent.filename);
  config = setupConfig(options);

  // The Tasks
  gulp.task('init', getTask('init', config));
  gulp.task('watch', getTask('watch', config));
  gulp.task('images', getTask('images', config));
  gulp.task('sass', getTask('sass', config));
  gulp.task('sprites', getTask('sprites', config));
  gulp.task('static', getTask('static', config));
  gulp.task('symbols', getTask('symbols', config));
  gulp.task('browserify', getTask('browserify', config));
  gulp.task('browserSync', ['watch'], getTask('browserSync', config));
  gulp.task('uglifyJs', getTask('uglifyJs', config));
  gulp.task('minifyCss', ['sass'], getTask('minifyCss', config));
  gulp.task('production', ['minifyCss', 'uglifyJs']);
  gulp.task('default', config.default.tasks);

  return gulp;
};