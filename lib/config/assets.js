var p = require('path');

module.exports = function(options) {
  var assets = {};

  // Convenience function for setting up the assets
  var _assets = function(asset) {
    if (options.scaffold.assets[asset].charAt(0) === '/') {
      return p.join(options.appDir, options.scaffold.assets[asset]);
    } else {
      return p.join(assets.root, options.scaffold.assets[asset]);
    }
  };

  assets.root     = p.join(options.appDir, options.scaffold.assets.root);
  assets.images   = _assets('images');
  assets.scripts  = _assets('scripts');
  assets.sprites  = _assets('sprites');
  assets.styles   = _assets('styles');
  assets.symbols  = _assets('symbols');
  assets.static   = _assets('static');

  return assets;
};