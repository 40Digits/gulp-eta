var p = require('path');

module.exports = function(options) {
  var source = {};

  source.root     = p.join(options.appDir, options.scaffold.source.root);
  source.images   = p.join(source.root, options.scaffold.source.images);
  source.scripts  = p.join(source.root, options.scaffold.source.scripts);
  source.sprites  = p.join(source.root, options.scaffold.source.sprites);
  source.styles   = p.join(source.root, options.scaffold.source.styles);
  source.symbols  = p.join(source.root, options.scaffold.source.symbols);
  source.static   = p.join(source.root, options.scaffold.source.static);
  source.symTpl   = p.join(source.symbols, 'template');

  return source;
};