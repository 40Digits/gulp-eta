var p = require('path');

module.exports = function(options) {
  var srcs = {};

  srcs.images     = p.join(options.source.images, options.globs.images);
  srcs.scripts    = p.join(options.source.scripts, options.globs.scripts);
  srcs.sprites    = p.join(options.source.sprites, options.globs.sprites);
  srcs.styles     = p.join(options.source.styles, options.globs.styles);
  srcs.symbols    = p.join(options.source.symbols, options.globs.symbols);
  srcs.static     = p.join(options.source.static, '*.tpl.html');

  return srcs;
};