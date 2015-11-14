var lazypipe = require('lazypipe');
var handleErrors = require('../util/handleErrors');

module.exports = function(gulp, plugins, config) {
  var minifyStream = lazypipe()
    .pipe(plugins.debug, { title: 'Minifying CSS:' })
    .pipe(plugins.minifyCss, { advanced: false })
    .pipe(plugins.debug, { title: 'Minified CSS:' })
    .pipe(plugins.filesize);

  return function () {
    return gulp.src(config.taskSrc('sass'))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass(config.sass.settings).on('error', handleErrors))
      .pipe(plugins.debug({title: 'Compiling Sass:'}))
      .pipe(plugins.autoprefixer(config.sass.autoprefixer))
      .pipe(plugins.sourcemaps.write())
      .pipe(plugins.if(config.sass.minify, minifyStream()))
      .pipe(gulp.dest(config.assetDir('sass')))
      .pipe(plugins.debug({title: 'Compiled Sass:'}));
  };
};
