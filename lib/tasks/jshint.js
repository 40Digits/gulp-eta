var p = require('path');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

module.exports = function(gulp, plugins, config) {
	var src = p.join(config.assets.scripts, '**/*.js');

	return function() {
		return gulp.src(src)
		    .pipe(jshint())
		    .pipe(jshint.reporter(stylish, config.jshint.reporterConfig));
	};
};
