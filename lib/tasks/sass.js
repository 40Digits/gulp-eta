var lazypipe = require('lazypipe');
var handleErrors = require('../util/handleErrors');

module.exports = function(gulp, plugins, config) {
  var minifyStream = lazypipe()
    .pipe(plugins.debug, { title: 'Minifying CSS:' })
    .pipe(plugins.minifyCss, { advanced: false })
    .pipe(plugins.debug, { title: 'Minified CSS:' })
    .pipe(plugins.filesize);

  return function () {
    return gulp.src(config.srcs.styles)
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass(config.sass.settings).on('error', handleErrors))
      .pipe(plugins.debug({title: 'Compiling Sass:'}))
      .pipe(plugins.sourcemaps.write())
      .pipe(plugins.autoprefixer(config.sass.autoprefixer))
      .pipe(plugins.if(config.sass.minify, minifyStream()))
      .pipe(gulp.dest(config.assets.styles))
      .pipe(plugins.debug({title: 'Compiled Sass:'}));
  };
};
