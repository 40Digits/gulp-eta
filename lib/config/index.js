var requireDirectory = require('require-directory');
var defaults = requireDirectory(module);

module.exports = function(config) {
  config.globs         = defaults.globs(config);
  config.scaffold      = defaults.scaffold.make(config);
  config.source        = defaults.source(config);
  config.assets        = defaults.assets(config);
  config.srcs          = defaults.srcs(config);
  config.browserify    = defaults.browserify(config);
  config.images        = defaults.images(config);
  config.sprites       = defaults.sprites(config);
  config.sass          = defaults.sass(config);
  config.autoprefixer  = defaults.autoprefixer(config);
  config.symbols       = defaults.symbols(config);
  config.static        = defaults.static(config);
  config.browserSync   = defaults.browserSync(config);
  config.uglifyJs      = defaults.uglifyJs(config);
  config.default       = defaults.default(config);
  config.production    = defaults.production(config);
  config.watch         = defaults.watch(config);
  config.init          = defaults.init(config);

  return config;
};
