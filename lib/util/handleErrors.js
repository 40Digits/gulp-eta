/* handleErrors
   ------------
   Send error to notification center with gulp-notify
*/

module.exports = function(error, plugins) {

  var args = Array.prototype.slice.call(arguments);

  return plugins.notify.onError({
    title: "Compile Error",
    message: "<%= error %>"
  }).apply(this, args);
};