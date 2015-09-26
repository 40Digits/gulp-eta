var p = require('path');
var watch = require('../util/watch');
var fs = require('fs');

module.exports = function(gulp, plugins, config) {
  var matchThese = [];

	return function() {
		plugins.util.log('Watching source files...');

    // set up the dirs to watch as defined in the config
    Object.keys(config.watch).forEach(function(folder) {
      var taskName = config.watch[folder],
        theseFiles = config.taskSrc(taskName),
        thisTask;

      // if this is one of our tasks
      if (fs.existsSync('./' + taskName)) {
        thisTask = require('./' + taskName)(gulp, plugins, config);
      // or if this is a custom one declared outside of Eta
      } else {
        // TODO – probably need to figure out a better way to do this
        thisTask = gulp.tasks[taskName].fn;
      }

      matchThese.push({
        // when a change happens to a glob of files
        when: theseFiles,
        // start the corresponding task
        then: thisTask
      });
    });

		watch({
      root: config.scaffold.source.root,
      match: matchThese
    });
	};
};