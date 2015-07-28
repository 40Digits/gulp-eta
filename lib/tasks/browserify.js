var p = require('path');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var bundleLogger = require('../util/bundleLogger');
var handleErrors = require('../util/handleErrors');
var lazypipe = require('lazypipe');

function getTransforms(settings) {
  var transforms = [];

  settings.forEach(function(module) {
    transforms.push(require(module));
  });

  return transforms;
}

module.exports = function(gulp, plugins, config) {

  return function(callback) {

    var bundleConfig;
    var queue;

    var uglifyStream = lazypipe()
      .pipe(plugins.debug, {title: 'Minifying JS:'})
      .pipe(plugins.uglify, config.uglifyJs.settings)
      .pipe(plugins.filesize)
      .pipe(plugins.debug, {title: 'Minified JS:'});

    function reportFinished() {
      bundleLogger.end();
      queue--;
      if (queue === 0) {
        if (callback) {
          callback();
        }
      }
    }

    /**
     * Add modules to a browserify bundle
     * @param {Object} b      A Browserify bundle object
     * @param {Array} entries The entries
     */
    function addEntries(b, entries) {
      var entryPath = '';

      // loop over all the entries
      entries.forEach(function(entry) {
        // handle exports
        if (typeof entry === 'object') {
          // set the filepath
          entryPath = p.join(config.source.scripts, entry.path);
          // add it and expose it for access outside the bundle
          b.add(entryPath).require(entryPath, { expose: entry.expose });
        } else {
          // handle entries that need to be ignored from the bundle
          if (entry.charAt(0) === '!') {
            // remove the !
            entry = entry.replace('!', '');
            // set the filepath
            entryPath = p.join(config.source.scripts, entry);
            // exclude it from the bundle
            b.external(entryPath);
          } else {
            // set the filepath
            entryPath = p.join(config.source.scripts, entry);
            // add it
            b.add(entryPath);
          }
        }
      });
    }

    function makeBundle(bundle) {
      // the bundle instance
      var b = browserify({
        fullPaths: false,
        // Add file extentions to make optional in your requires
        extensions: config.extensions,
        // Enable source maps!
        debug: config.debug,
        transform: getTransforms(config.browserify.transform)
      });

      // add the entries to the bundle
      addEntries(b, bundle.entries);

      // Log when bundling starts
      bundleLogger.start(bundle.outputName);

      return b
        .bundle()
        // Report compile errors
        .on('error', handleErrors)
        // Use vinyl-source-stream to make the
        // stream gulp compatible. Specifiy the
        // desired output filename here.
        .pipe(source(bundle.outputName))
        .pipe(buffer())
        .pipe(plugins.if(config.browserify.uglify, uglifyStream()))
        .on('end', reportFinished)
        // Specify the output destination
        .pipe(gulp.dest(config.assets.scripts))
        .pipe(plugins.browserSync.stream());
    }

    function getFreshConfig() {
      // clear the cache for the bundle config
      delete require.cache[config.browserify.bundleConfig];
      // get the bundle array
      bundleConfig = config.browserify.bundleConfig ? require(config.browserify.bundleConfig) : config.browserify.bundles;
      // set the queue to know when we're done
      queue = bundleConfig.length;

      // make sure that there actually are bundles
      if (!queue) {
        return plugins.util.log(plugins.util.colors.red("You haven't declared any bundles!"), 'Aborting...');
      }
    }

    // get the bundles
    getFreshConfig();

    // create the bundles
    bundleConfig.forEach(makeBundle);
  };
};