var p = require('path');
var merge = require('../util/mergeOptions.js');

module.exports = function(options) {
  // The default configuration
  var defaults = {
    destSass: p.join(options.source.styles, 'utils'),
    settings: {
      src: options.srcs.sprites,
      retina: true,
      dimension: [
        {
          ratio: 1, dpi: 72
        }, {
          ratio: 2, dpi: 192
        }
      ],
      margin: 0,
      split: true, // to create multiple sprites by putting images in subdirectories
      name: 'sprite', // for split. ex: sprite-main.png, sprite-blog.png
      style: '_sprites.scss',
      cssPath: p.join(options.assets.root, options.assets.sprites),
      template: p.join(options.scaffold.source.root, options.scaffold.source.sprites, '/template/scss.hbs'),
      processor: 'sass',
      orientation: 'binary-tree',
      prefix: 'sprite' // for sass
    }
  };

  return merge('sprites', options, defaults);
};