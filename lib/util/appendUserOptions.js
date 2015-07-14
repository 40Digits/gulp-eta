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
  var regex = new RegExp(varName + '\\([\s]*?' + gulpVarName + ',?[\\s]?([\\S\\s]*?)\\)'),
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

module.exports = function(gulpfile, config, transformation) {
  var etaVarName = getVarName('gulp-eta', gulpfile),
    gulpVarName = getVarName('gulp', gulpfile),
    currentOptions = getCurrentOptions(etaVarName, gulpVarName, gulpfile),
    newOptions = transformation(currentOptions, config);

  // correct indentation
  newOptions = beautify(newOptions, { indent_size: 2 });

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