var fs = require('fs');
var beautify = require('js-beautify');

var getVarName = function(string) {
  var matches = string.match(/(\w+)[\s]*?=[\s]*?require\(['"]gulp-eta['"]\)+/);
  return matches[1];
};

var getVarData = function(varName, string) {
  var regex = new RegExp(varName + '[\\s]*?=[\\s]*?({[\\S\\s]*?});'),
    matches = string.match(regex);
  return matches[1];
};

var getOptions = function(varName, string) {
  var regex = new RegExp(varName + '\\(([\\S\\s]*)\\)'),
    matches = string.match(regex);

  // if there are no options being declared
  // return a stringified empty object
  if (matches[1] === '') {
    return ['{}', matches[0]];
  // if the options are declared inside of the instantiation
  // return the options
  } else if (matches[1].charAt() === '{') {
    return matches[1];
  // if a variable is passed into the instantion
  // find the variable data and return that
  } else {
    // remove spaces
    matches[1] = matches[1].replace(/\s/g, '');
    return getVarData(matches[1], string);
  }
};

var setBundles = function(data, currentOptions) {
  var stringToAdd = "browserify: {bundles: require('" + config.init.bundlesPath + "'),",
    instanceString = null,
    newOptions;

  // if we're starting with a blank options object
  if (typeof currentOptions !== 'string') {
    instanceString = currentOptions[1];
    currentOptions = currentOptions[0];
  }

  // if browserify bundles have already been declared
  // replace those bundles with our default ones
  if (currentOptions.indexOf('browserify:') !== -1) {
    newOptions = currentOptions.replace(/browserify[:\S\s]+{/, stringToAdd);
  // if there are no bundles declared
  // set them up
  } else {
    newOptions = currentOptions.replace('{', '{' + stringToAdd + '},');
  }

  // replace the old options with the
  // new ones that include the bundles
  if (instanceString) {
    // make sure there are no spaces between the parentheses
    currentOptions = instanceString.replace(/\([\s]*?\)/, '()');
    // inject the new options into the instance string
    // for easy replacement in the gulpfile
    newOptions = instanceString.replace('()', '(' + newOptions + ')');
  }
  
  newOptions = beautify(newOptions, { indent_size: 2 });

  return data.replace(currentOptions, newOptions);
};

var transformData = function(data) {
  var varName = getVarName(data),
    options = getOptions(varName, data);

  return setBundles(data, options);
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