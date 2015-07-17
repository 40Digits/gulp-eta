var p = require('path');
var browserify = require('./browserify');

module.exports = function(gulp, plugins, config) {
	return function() {
		config.browserify.uglify = true;
		return browserify(gulp, plugins, config)();
	}
};
