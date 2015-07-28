var defaults = require('./index.js');

module.exports = function(options) {
  options.globs         = defaults.globs(options);
  options.scaffold      = defaults.scaffold.make(options);
  options.source        = defaults.source(options);
  options.assets        = defaults.assets(options);
  options.srcs          = defaults.srcs(options);
  options.browserify    = defaults.browserify(options);
  options.images        = defaults.images(options);
  options.sprites       = defaults.sprites(options);
  options.sass          = defaults.sass(options);
  options.autoprefixer  = defaults.autoprefixer(options);
  options.symbols       = defaults.symbols(options);
  options.static        = defaults.static(options);
  options.browserSync   = defaults.browserSync(options);
  options.jshint        = defaults.jshint(options);
  options.uglifyJs      = defaults.uglifyJs(options);
  options.default       = defaults.default(options);
  options.watch         = defaults.watch(options);
  options.init          = defaults.init(options);

  return options;
};