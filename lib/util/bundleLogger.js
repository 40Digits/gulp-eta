/* bundleLogger
   ------------
   Provides gulp style logs to the bundle method in browserify.js
*/

var gutil = require('gulp-util');
var prettyHrtime = require('pretty-hrtime');
var startTime;
var filenames = [];

module.exports = {
  start: function(filepath) {
    startTime = process.hrtime();
    filenames.push(filepath);
    gutil.log('Bundling', gutil.colors.green(filepath) + '...');
  },

  watch: function(bundleName) {
    gutil.log('Watching files required by', gutil.colors.yellow(bundleName));
  },

  end: function() {
    var taskTime = process.hrtime(startTime);
    var prettyTime = prettyHrtime(taskTime);
    var filename = filenames[0];
    filenames.shift();
    gutil.log('Bundled', gutil.colors.green(filename), 'in', gutil.colors.magenta(prettyTime));
  }
};