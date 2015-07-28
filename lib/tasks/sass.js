var handleErrors = require('../util/handleErrors');

module.exports = function(gulp, plugins, config) {
  return function () {
    return gulp.src(config.srcs.styles)
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass(config.sass.settings).on('error', handleErrors))
      .pipe(plugins.debug({title: 'Compiling Sass:'}))
      .pipe(plugins.sourcemaps.write())
      .pipe(plugins.autoprefixer(config.sass.autoprefixer))
      .pipe(gulp.dest(config.assets.styles))
      .pipe(plugins.debug({title: 'Compiled Sass:'}));
  }
};