/* watch
   -----
   watch takes a single parameter: options, which is an object
   options.root = the directory to be watched
   otions.match = an array of match objects

   A match object is as follows:
   match.when = a string containing a minimatch pattern (see npm minimatch)
   match.then = a function to be called when any watched file matches the when clause
*/
var path = require('path');
var monocle = require('monocle');
var minimatch = require('minimatch');

module.exports = function (options) {
  var fullRoot = path.resolve(options.root);

  function onFileChange (e) {
    var relativePath = path.relative(fullRoot, e.fullPath);

    options.match.some(function (match) {
      var isMatch = minimatch(relativePath, match.when);
      if (isMatch)
          match.then();
      return isMatch;
    });
  }

  monocle().watchDirectory({
    root: options.root,
    listener: onFileChange
  });
};