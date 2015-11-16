/**
 * waitFor
 * @param  {String}   selector DOM element to check for on every page load
 * @param  {Function} callback The code to execute when the element is on the page
 * @param  {Object} [options] Set the "this" context, to be applied to callback
 * @return Result of callback OR false on empty selector
 */
module.exports = function(selector, callback, context) {
  var element = document.querySelectorAll(selector);

  if (! element.length > 0)
    return false;

  context = context || window;

  if (!!window.jQuery)
    return callback.apply( context, [window.jQuery(selector)] );

  return callback.apply( context, [element]);
};