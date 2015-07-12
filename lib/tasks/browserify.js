var p = require('path');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var bundleLogger = require('../util/bundleLogger');
var handleErrors = require('../util/handleErrors');

module.exports = function(gulp, plugins, config) {

	return function(callback) {

		var queue = config.browserify.bundles.length;
		
		var reportFinished = function() {
			bundleLogger.end();
			queue--;
			if (queue === 0) {
				if (callback) {
					callback();
				}
			}
		};

		// make sure that there actually are bundles
		if (!queue) {
			return plugins.util.log(plugins.util.colors.red("You haven't declared any bundles!"), 'Aborting...');
		}

		// create the bundles
		config.browserify.bundles.forEach(function(bundle) {
			var entries = [],
				b;

			bundle.entries.forEach(function(entry) {
				entries.push(p.join(config.source.scripts, entry));
			});

			b = browserify({
				cache: {},
				packageCache: {},
				fullPaths: false,
				entries: entries,
				// Add file extentions to make optional in your requires
				extensions: config.extensions,
				// Enable source maps!
				debug: config.debug
			});

			// Log when bundling starts
			bundleLogger.start(bundle.outputName);

			return b
				.bundle()
				// Report compile errors
				.on('error', function(error) {
					handleErrors(error, plugins);
				})
				// Use vinyl-source-stream to make the
				// stream gulp compatible. Specifiy the
				// desired output filename here.
				.pipe(source(bundle.outputName))
				.on('end', reportFinished)
				// Specify the output destination
				.pipe(gulp.dest(config.assets.scripts))
				.pipe(plugins.browserSync.stream());
		});
	};
};