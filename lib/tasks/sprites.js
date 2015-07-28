var sprite = require('sprity');

module.exports = function(gulp, plugins, config) {
  return function() {
    return sprite.src(config.sprites.settings)
      .pipe(plugins.if('*.png', gulp.dest(config.assets.sprites)))
      .pipe(plugins.if('*.sass', gulp.dest(config.sprites.destSass)))
      .pipe(plugins.if('*.scss', gulp.dest(config.sprites.destSass)))
      .pipe(plugins.debug({title: 'Sprite created:'}));
  }
};