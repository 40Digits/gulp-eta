var p = require('path');
var fs = require('fs');
var merge = require('./deepishMerge.js');

module.exports = function(config, plugins) {
  // log that we're starting
  plugins.util.log("Updating '" + plugins.util.colors.magenta('package.json') + "'...");

  // read the current contents of the manifest file and add the new stuff to it
  fs.readFile(config.init.manifestPath, { encoding: 'utf8' }, function(err, data) {
    if (err) throw err;

    data = data ? JSON.parse(data) : {};
    data = merge(data, config.init.stuffToAppend);

    fs.writeFile(config.init.manifestPath, JSON.stringify(data, null, 2), function() {
      plugins.util.log("Finished updating '" + plugins.util.colors.green('package.json') + "'");
    });
  });
};
