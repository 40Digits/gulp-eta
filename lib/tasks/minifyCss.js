var p = require('path');

module.exports = function(gulp, plugins, config) {
	var src = p.join(config.assets.styles, '*.css');

	return function() {
		return gulp.src(src)
			.pipe(plugins.combineMq())
			.pipe(plugins.minifyCss({advanced:false}))
			.pipe(gulp.dest(config.assets.styles))
			.pipe(plugins.filesize());
	}
};