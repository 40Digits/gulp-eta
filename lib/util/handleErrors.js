/* handleErrors
   ------------
   Send error to notification center with gulp-notify
*/
var notify = require('gulp-notify');

module.exports = function(error) {

  var args = Array.prototype.slice.call(arguments);

  return notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
};