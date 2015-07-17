var p = require('path');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var bundleLogger = require('../util/bundleLogger');
var handleErrors = require('../util/handleErrors');

function getTransforms(settings) {
  var transforms = [];

  settings.forEach(function(module) {
    transforms.push(require(module));
  });

  return transforms;
};

module.exports = function(gulp, plugins, config) {

  return function(callback) {

    var queue = config.browserify.bundles.length;

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
    }

    // make sure that there actually are bundles
    if (!queue) {
      return plugins.util.log(plugins.util.colors.red("You haven't declared any bundles!"), 'Aborting...');
    }

    // create the bundles
    config.browserify.bundles.forEach(makeBundle);
  };
};