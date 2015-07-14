var p =require('path');
var merge = require('../util/mergeOptions.js');

module.exports = function(options) {
  // The default configuration
  var defaults = {
    tplCss: p.join(options.source.symTpl, 'symbols.tpl.css'),
    tplSass: p.join(options.source.symTpl, 'symbols.tpl.scss'),
    tplHtml: p.join(options.source.symTpl, 'symbols.tpl.html'),
    fontPath: p.join(options.assets.root, options.assets.symbols, '/'),
    destSass: p.join(options.source.styles, 'utils'),
    settings: {
      fontName: 'symbols',
      appendCodepoints: false,
      centerHorizontally: true,
      normalize: true,
      fontHeight: false
    },
    renameSass: {
      basename: '_symbols',
      extname: '.scss'
    }
  };

  return merge('symbols', options, defaults);
};