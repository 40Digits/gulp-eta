var p = require('path');
var watch = require('../util/watch');

module.exports = function(gulp, plugins, config) {
  var matchThese = [];

  // set up the dirs to watch as defined in the config
  Object.keys(config.watch).forEach(function(folder) {
    matchThese.push({
      // when a change happens to a glob of files
      when: p.join(config.scaffold.source[folder], config.globs[folder]),
      // start the corresponding task
      then: require('./' + config.watch[folder])(gulp, plugins, config)
    });
  });

	return function() {
		plugins.util.log('Watching source files...');
		watch({
      root: config.source.root,
      match: matchThese
    })
	};
};