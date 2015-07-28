var p = require('path');
var mkdirp = require('mkdirp');
var ncp = require('ncp').ncp;
var defaultScaffold = require('../config/scaffold.js').defaults.source;

var makeFolders = function(config, plugins) {
  Object.keys(config.scaffold.source).forEach(function(key) {
    if (key === 'root') return;

    var source = p.join(config.init.srcDir, defaultScaffold[key]),
      dest = config.source[key],
      logPath = p.join(config.scaffold.source.root, config.scaffold.source[key]);

    // copy the folder
    ncp(source, dest, function(err) {
      if (err) {
        return console.log(err);
      }
      plugins.util.log("Created '" + plugins.util.colors.green(logPath) + "'");
    });
  });
};

module.exports = function(config, plugins) {
  // Start creating _src
  plugins.util.log("Creating '" + plugins.util.colors.magenta(config.scaffold.source.root) + "' directory...");

  // make the _src folder
  mkdirp(config.source.root, function(err) {
    if (err) throw err;

    makeFolders(config, plugins);
  });
};