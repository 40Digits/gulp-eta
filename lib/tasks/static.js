module.exports = function(gulp, plugins, config) {
	return function() {
		return gulp.src(config.srcs.static)
			.pipe(plugins.fileInclude())
			.pipe(plugins.rename({ extname: "" }))
			.pipe(plugins.rename({ extname: config.static.extension }))
			.pipe(gulp.dest(config.assets.static))
			.pipe(plugins.browserSync.stream());
	}
};