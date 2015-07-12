var p = require('path');
var watch = require('../util/watch');
var fs = require('fs');

module.exports = function(gulp, plugins, config) {
  var matchThese = [];

	return function() {
		plugins.util.log('Watching source files...');

    // set up the dirs to watch as defined in the config
    Object.keys(config.watch).forEach(function(folder) {
      var theseFiles = p.join(config.scaffold.source[folder], config.globs[folder]),
        thisTask;

      // if this is one of our tasks
      if (fs.existsSync('./' + config.watch[folder])) {
        thisTask = require('./' + config.watch[folder])(gulp, plugins, config);
      // or if this is a custom one declared outside of Eta
      } else {
        // TODO – probably need to figure out a better way to do this
        thisTask = gulp.tasks[config.watch[folder]].fn
      }

      matchThese.push({
        // when a change happens to a glob of files
        when: theseFiles,
        // start the corresponding task
        then: thisTask
      });
    });

		watch({
      root: config.source.root,
      match: matchThese
    })
	};
};