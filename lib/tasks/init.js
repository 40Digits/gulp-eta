var p = require('path');
var fs = require('fs');
var merge = require('../util/deepishMerge.js');
var makeSrc = require('../util/makeSrc.js');
var installDependencies = require('../util/installDependencies.js');
var updatePackageJSON = require('../util/updateManifest.js');
var updateGulpfile = require('../util/updateGulpfile.js');
var argv = require('minimist')(process.argv.slice(2));

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

      // setup the proxy config
      var proxy = argv.p || argv.proxy;
      if (proxy) {
        if (proxy === true) {
          config.browserSync.settings.proxy = 'l.' + p.basename(config.appDir);
        } else {
          config.browserSync.settings.proxy = proxy;
        }
      }

      // update parent manifest file
      updatePackageJSON(config, plugins);
      // create the source dir
      makeSrc(config, plugins);
      // install dependencies
      installDependencies(config, plugins);
      // update gulpfile with browserify bundles & browsersync proxy
      updateGulpfile(config, plugins);
    });
  };
};