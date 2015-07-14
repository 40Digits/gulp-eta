var fs = require('fs');
var appendUserOptions = require('./appendUserOptions');

var addProxy = function(currentOptions, config) {
  var stringToAdd = "proxy: '" + config.browserSync.settings.proxy + "'",
      browserSync = currentOptions.match(/(browserSync[\s]*?:[\s]*?\{)/g);

  // if browserSync options already been declared
  if (browserSync) {
    var regex = new RegExp(browserSync + '[\\S\\s]+settings[\\s]*?:[\\s]*?\{'),
      settings = currentOptions.match(regex);

    // if browserSync settings object has been declared
    if (settings) {
      return currentOptions.replace(settings[0], settings[0] + stringToAdd + ",");
    } else {
      return currentOptions.replace(browserSync[0], browserSync[0] + 'settings: {' + stringToAdd + '},');
    }
  } else {
    return currentOptions.replace('{', '{browserSync: {settings: {' + stringToAdd + '}},');
  }
};

var addBundles = function(currentOptions, config) {
  var stringToAdd = "bundles: require('" + config.init.bundlesPath + "')";

  // if browserify bundles have already been declared
  // replace those bundles with our default ones
  if (currentOptions.indexOf('browserify:') !== -1) {
    return currentOptions.replace(/browserify[\s]*?:[\s]*?\{/g, 'browserify: {' + stringToAdd + ',');
  // if there are no bundles declared set them up
  } else {
    return currentOptions.replace('{', '{browserify: {' + stringToAdd + '},');
  }
};

module.exports = function(config, plugins) {
  // log that we're starting
  plugins.util.log("Adding '" + plugins.util.colors.magenta('browserify bundles') + "' in gulpfile.js...");

  // read the current contents of the manifest file and add the new stuff to it
  fs.readFile(config.init.gulpfile, { encoding: 'utf8' }, function(err, data) {
    if (err) throw err;

    // make sure that bundles have not already been declared
    if (!data.match(/browserify[\S\s]+bundles[\S\s]*?\}/g)) {
      data = appendUserOptions(data, config, addBundles);
    };

    // if a browserSync proxy has been defined
    if (config.browserSync.settings.proxy) {
      // make sure that a proxy has not already been declared
      if (!data.match(/browserSync[\S\s]+proxy[\S\s]*?\}/g)) {
        data = appendUserOptions(data, config, addProxy);
      };
    }

    fs.writeFile(config.init.gulpfile, data, function() {
      plugins.util.log("Finished updating '" + plugins.util.colors.green('gulpfile.js') + "'");
    });
  });
};