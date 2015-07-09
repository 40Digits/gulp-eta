var sprite = require('css-sprite').stream;

module.exports = function(gulp, plugins, config) {
	return function() {
		return gulp.src(config.srcs.sprites)
			.pipe(sprite(config.sprites.settings))
			.pipe(plugins.if('*.png', gulp.dest(config.assets.sprites)))
			.pipe(plugins.if('*.sass', gulp.dest(config.sprites.destSass)))
			.pipe(plugins.if('*.scss', gulp.dest(config.sprites.destSass)))
			.pipe(plugins.browserSync.stream());
	}
};