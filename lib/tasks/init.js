var fs = require('fs');
var merge = require('../util/deepishMerge.js');
var makeSrc = require('../util/makeSrc.js');
var installDependencies = require('../util/installDependencies.js');
var updatePackageJSON = require('../util/updateManifest.js');
var setupBundles = require('../util/setupBundles.js');

module.exports = function(gulp, plugins, config) {
  return function() {
    // make sure the source dir doesn't already exist
    return fs.readdir(config.source.root, function(err) {
      // prevent the task from running if the source dir already exists
      // so as to not overwrite what they currently have
      if (!err) {
        plugins.util.log(plugins.util.colors.red('Your source dir already exists!'), 'Aborting...');
        return false;
      }

      // SHOWTIME
      // update parent manifest file
      updatePackageJSON(config, plugins);
      // create the source dir
      makeSrc(config, plugins);
      // install dependencies
      installDependencies(config, plugins);
      // update gulpfile with browserify bundles
      setupBundles(config, plugins);
    });
  };
};