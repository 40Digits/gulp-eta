module.exports = function(gulp, plugins, config) {
	return function () {
		return gulp.src(config.srcs.styles)
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.sass(config.sass.settings).on('error', plugins.sass.logError))
			.pipe(plugins.sourcemaps.write())
			.pipe(plugins.autoprefixer(config.sass.autoprefixer))
			.pipe(gulp.dest(config.assets.styles));
	}
};
