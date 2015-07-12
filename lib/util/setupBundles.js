var fs = require('fs');
var beautify = require('js-beautify');

var instanceString = '';

var getVarName = function(module, string) {
  var regex = new RegExp('(\\w+)[\\s]*?=[\\s]*?require\\([\\s]*?[\'\"]' + module + '[\'\"][\\s]*?\\)+'),
    matches = string.match(regex);

  return matches[1];
};

var getVarData = function(varName, string) {
  var regex = new RegExp(varName + '[\\s]*?=[\\s]*?({[\\S\\s]*?});'),
    matches = string.match(regex);
  return matches[1];
};

var getCurrentOptions = function(varName, gulpVarName, string) {
  var regex = new RegExp(varName + '\\([\s]*?' + gulpVarName + ',?[\\s]?([\\S\\s]*)\\)'),
    matches = string.match(regex);

  instanceString = matches[0];

  // if there are no options being declared
  // return a stringified empty object
  if (matches[1] === '') {
    return '{}';
  // if the options are declared inside of the instantiation
  // return the options
  } else if (matches[1].charAt(0) === '{') {
    return matches[1];
  // if a variable is passed into the instantion
  // find the variable data and return that
  } else {
    // remove spaces
    matches[1] = matches[1].replace(/\s/g, '');
    return getVarData(matches[1], string);
  }
};

var addBundles = function(currentOptions) {
  var stringToAdd = "browserify: {bundles: require('" + config.init.bundlesPath + "'),";

  // if browserify bundles have already been declared
  // replace those bundles with our default ones
  if (currentOptions.indexOf('browserify:') !== -1) {
    newOptions = currentOptions.replace(/browserify[\s]*?:[\s]*?\{/g, stringToAdd);
  // if there are no bundles declared
  // set them up
  } else {
    newOptions = currentOptions.replace('{', '{' + stringToAdd + '},');
  }
  
  // return the formatted options containing the bundles config
  return beautify(newOptions, { indent_size: 2 });
};

var transformData = function(gulpfile) {
  var etaVarName = getVarName('gulp-eta', gulpfile),
    gulpVarName = getVarName('gulp', gulpfile),
    currentOptions = getCurrentOptions(etaVarName, gulpVarName, gulpfile);

  newOptions = addBundles(currentOptions);

  // if we're starting with fresh options
  if (currentOptions === '{}') {
    var regex = new RegExp('(' + gulpVarName + '[,\s]?)\\)'),
      matches = instanceString.match(regex);

    newInstanceString = instanceString.replace(matches[1], gulpVarName + ', {}');
    newInstanceString = newInstanceString.replace('{}', newOptions);
    // replace the old instance which didn't have options
    // with a new instance that has options
    return gulpfile.replace(instanceString, newInstanceString);
  } else {
    // replace the old options with the new ones
    return gulpfile.replace(currentOptions, newOptions);
  }
};

module.exports = function(config, plugins) {
  // log that we're starting
  plugins.util.log("Updating '" + plugins.util.colors.magenta('gulpfile.js') + "'...");

  // read the current contents of the manifest file and add the new stuff to it
  fs.readFile(config.init.gulpfile, { encoding: 'utf8' }, function(err, data) {
    if (err) throw err;

    // make sure that bundles have not already been declared
    if (!data.match(/browserify[\s:.={]+bundles/g)) {
      data = transformData(data);
    };

    fs.writeFile(config.init.gulpfile, data, function() {
      plugins.util.log("Finished updating '" + plugins.util.colors.green('gulpfile.js') + "'");
    });
  });
};