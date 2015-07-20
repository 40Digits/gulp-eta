var handleErrors = require('../util/handleErrors');
module.exports = function(gulp, plugins, config) {
	return function() {
		return gulp.src(config.srcs.images)
			.pipe(plugins.changed(config.assets.images))
      .pipe(plugins.debug({title: 'Minifying Image:'}))
			.pipe(plugins.imagemin(config.images.settings).run(handleErrors))
			.pipe(gulp.dest(config.assets.images))
      .pipe(plugins.debug({title: 'Minified Image:'}))
			.pipe(plugins.browserSync.stream());
	}
};
