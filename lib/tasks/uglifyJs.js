var p = require('path');

module.exports = function(gulp, plugins, config) {
	return function() {
		var src = p.join(config.assets.scripts, '.js');
		
		return gulp.src(src)
      .pipe(plugins.debug({title: 'Minifying JS:'}))
			.pipe(plugins.uglify())
			.pipe(gulp.dest(config.assets.scripts))
			.pipe(plugins.filesize())
      .pipe(plugins.debug({title: 'Minified JS:'}));
	}
};
