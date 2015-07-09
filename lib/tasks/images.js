module.exports = function(gulp, plugins, config) {
	return function() {
		return gulp.src(config.srcs.images)
			.pipe(plugins.changed(config.assets.images))
			.pipe(plugins.imagemin())
			.pipe(gulp.dest(config.assets.images))
			.pipe(plugins.browserSync.stream());
	}
};
