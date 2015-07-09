var p = require('path');

module.exports = function(gulp, plugins, config) {
	return function() {
		plugins.util.log('Watching source files...');

		Object.keys(config.watch).forEach(function(folder) {
			gulp.watch(config.srcs[folder], [config.watch[folder]]);
		});
	};
};