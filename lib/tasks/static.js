var handleErrors = require('../util/handleErrors');

module.exports = function(gulp, plugins, config) {
	return function() {
		return gulp.src(config.taskSrc('static'))
			.pipe(plugins.fileInclude(config.static.settings).on('error', handleErrors))
			.pipe(plugins.rename({ extname: "" }))
			.pipe(plugins.rename({ extname: config.static.extension }))
			.pipe(gulp.dest(config.assetDir('static')))
      .pipe(plugins.debug({title: 'Static Files Compiled:'}));
	};
};
