var handleErrors = require('../util/handleErrors');
module.exports = function(gulp, plugins, config) {
	return function() {
		return gulp.src(config.taskSrc('images'))
			.pipe(plugins.changed(config.assetDir('images')))
      .pipe(plugins.debug({title: 'Minifying Image:'}))
			.pipe(plugins.imagemin(config.images.settings))
			.pipe(gulp.dest(config.assetDir('images')))
      .pipe(plugins.debug({title: 'Minified Image:'}));
	};
};
