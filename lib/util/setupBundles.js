var fs = require('fs');

function getVarName(string) {
  var matches = string.match(/(\w+)[\S\s]=[\S\s]require\(['"]gulp-eta['"]\)[;,]+/);
  return matches[1];
}

function getOptions(varName, string) {
  var regex = new RegExp(varName + '\(([\S\s]+)\)'),
    matches = string.match(regex);

  if (!matches) {
    return '{}';
  }

  if (matches[1].charAt() === '{') {
    return matches[1];
  } else {
    regex = new RegExp(matches[1] + '[\\S\\s]+=[\\S\\s]+({[\\S\\s]})');
    matches = string.match(regex);
    return matches[1];
  }
}

function setBundles(options, bundlesString) {
  var stringToAdd = "browserify: {\n    bundles: require('" + config.init.bundlesPath + "'),\n";

  if (options.indexOf('browserify') !== -1) {
    options = options.replace(/browserify[:\S\s]+{/, stringToAdd)
  } else {
    options = options.replace('{', '{\n  ' + stringToAdd + '  }\n');
  }

  return options;
}

function setOptions(varName, string, options) {
  var regex = new RegExp('gulp.tasks[\\S\\s]+=[\\S\\s]+' + varName + '\\((\{?[\\S\\s]*\}?)\\)'),
    matches = string.match(regex);
  
  if (matches[1] === '') {
    return string.replace(matches[0], 'gulp.tasks = ' + varName + '(' + options + ')');
  }

  return string.replace(matches[1], options);
}

module.exports = function(config, plugins) {
  // log that we're starting
  plugins.util.log("Updating '" + plugins.util.colors.magenta('gulpfile.js') + "'...");

  // read the current contents of the manifest file and add the new stuff to it
  fs.readFile(config.init.gulpfile, { encoding: 'utf8' }, function(err, data) {
    if (err) throw err;

    // check if bundles have already been declared
    if (data.indexOf(/browserify[\s:.={]+bundles/g) >= 0) return false;

    var varName = getVarName(data),
      options = getOptions(varName, data);

    options = setBundles(options, config.init.bundlesString);
    data = setOptions(varName, data, options);

    fs.writeFile(config.init.gulpfile, data, function() {
      plugins.util.log("Finished updating '" + plugins.util.colors.green('gulpfile.js') + "'");
    });
  });
};