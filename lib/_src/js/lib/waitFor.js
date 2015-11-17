/**
 * waitFor
 * @param  {String}   selector DOM element to check for on every page load
 * @param  {Function} [options] callback The code to execute when the element is on the page
      if left off, a promise structure is assumed
      waitFor(selector).then(fn).catch(fn)
 * @param  {Object} [options] Set the "this" context, to be applied to callback
 * @return Result of callback OR false on empty selector
 */

var Promise = function (selector, callback, context) {
  this.context = context || window;

  this.success = callback || function () { return false; };
  this.fail = function () { return false };

  if (!!window.jQuery) {
    this.$el = window.jQuery( selector );
  } else {
    this.$el = document.querySelectorAll( selector );
  }


  this.catch = function (fn) {
    this.fail = fn;
    return this;
  }

  this.then = function (fn) {
    this.success = fn;
    return this;
  }

  this.delay = function () {
    var test = this;

    test.To = window.setTimeout( function () {
      if (test.$el.length > 0) {
        test.success.call( test.context, test.$el );
      } else
        test.fail.call( test.context, false );
    });

    return this;
  }

  return this.delay();
}

module.exports = function (selector, callback, context) {
  var element = document.querySelectorAll(selector);
  // callback pattern
  if ('function' == typeof callback) {
    if (! element.length > 0)
      return false;

    if (!!window.jQuery)
      return callback.call( (context || window), window.jQuery(selector) );

    return callback.call( (context || window), element );
  }

  return new Promise(selector, callback, context);
}