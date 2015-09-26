var p = require('path');
var merge = require('./util/deepishMerge.js');

var config = {
  taskMap: {
    images:     'images',
    browserify: 'scripts',
    sprites:    'sprites',
    sass:       'styles',
    static:     'static',
    symbols:    'symbols'
  },
  scaffold: {
    source: {
      root:     '_src',
      images:   'images',
      scripts:  'js',
      sprites:  'sprites',
      styles:   'sass',
      symbols:  'symbols',
      static:   'static'
    },
    assets: {
      root:     'assets',
      images:   'images',
      scripts:  'js',
      sprites:  'images/sprites',
      styles:   '/',
      symbols:  'fonts/symbols',
      static:   '/'
    }
  }
};

/**
 * Returns the path to a folder inside of the "_src" directory
 * @param  {String} subDir The identifier of the folder within the source dir
 * @return {String}        The normalized path
 */
config.sourceDir = function(subDir) {
  return p.join(config.scaffold.source.root, config.scaffold.source[subDir]);
};

/**
 * Returns the path to a kind of asset
 * @param  {String} asset The name of the asset to get the path for
 * @return {String}       The normalized path
 */
config.assetDir = function(asset) {
  if (config.scaffold.assets[asset].charAt(0) === '/') {
    return './' + config.scaffold.assets[asset];
  }
  return p.join(config.scaffold.assets.root, config.scaffold.assets[asset]);
};

/**
 * Returns a glob file path to be used by the task as the gulp#src
 * @param  {String} subDir The identifier of the folder within the source dir
 * @param  {String} glob   The glob for the files to match
 * @return {String}        The normalized path
 */
config.taskSrc = function(task) {
  return p.join(config.sourceDir(config.taskMap[task]), config[task].match);
};

module.exports = function(options, appDir) {
  appDir = appDir ? appDir : '';
  options = options ? options : {};

  config.appDir = appDir;

  if (options.scaffold) {
    config.scaffold = merge(config.scaffold, options.scaffold);
  }


  config.images = {
    match: '**/*.+(png|jpg|jpeg|svg|gif)',
    settings: {
      progressive: true,
      optimizationLevel: 4
    }
  };

  config.browserify = {
    match: '**/*.+(js|ejs)',
    debug: false,
    extensions: '.js',
    uglify: false,
    bundles: [],
    bundleConfig: p.join(config.sourceDir('scripts'), 'config/bundles.js'),
    transform: ['browserify-shim', 'browserify-ejs'],
    aliases: {
      'waitFor': p.join(config.sourceDir('scripts'), 'lib/waitFor.js')
    },
    shim: { 'jquery': 'global:$' }
  };

  config.sprites = {
    match: '**/*.+(png)',
    destSass: p.join(config.sourceDir('styles'), 'utils')
  };
  config.sprites.settings = {
    src: config.taskSrc('sprites'),
    retina: true,
    dimension: [
      {
        ratio: 1, dpi: 35
      }, {
        ratio: 2, dpi: 72
      }
    ],
    margin: 0,
    split: true, // to create multiple sprites by putting images in subdirectories
    name: 'sprite', // for split. ex: sprite-main.png, sprite-blog.png
    style: '_sprites.scss',
    cssPath: '/' + config.assetDir('sprites'),
    template: p.join(config.sourceDir('sprites'), '/template/scss.hbs'),
    processor: 'sass',
    orientation: 'binary-tree',
    prefix: 'sprite' // for sass
  };

  config.sass = {
    match: '**/*.+(sass|scss)',
    minify: false,
    settings: {
      indentedSyntax: true,
      errLogToConsole: true,
      outputStyle: 'nested'
    },
    globbing: {
      extensions: ['.scss', '.sass']
    },
    autoprefixer: {
      browsers: [
        'last 2 versions',
        'safari 5',
        'ie 8',
        'ie 9',
        'android 4'
      ],
      cascade: true
    }
  };

  config.symbols = {
    match: '*.+(svg)',
    tplCss: p.join(config.sourceDir('symbols'), 'template/symbols.tpl.css'),
    tplSass: p.join(config.sourceDir('symbols'), 'template/symbols.tpl.scss'),
    tplHtml: p.join(config.sourceDir('symbols'), 'template/symbols.tpl.html'),
    fontPath: '/' + config.assetDir('symbols') + '/',
    destSass: p.join(config.sourceDir('styles'), 'utils'),
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

  config.static = {
    match: '**/*.+(html)',
    extension: ".html",
    // see https://www.npmjs.com/package/gulp-file-include for available settings
    settings: {
      prefix: '@@',
      basepath: '@file'
    }
  };

  config.browserSync = {
    before: ['watch'],
    // See http://www.browsersync.io/docs/options/ for a complete list of configuration options
    settings: {
      server: true,
      open: true,
      notify: false,
      reloadOnRestart: true,
      files: [
        p.join(config.scaffold.assets.root, '**/*.*'),
        './**/*.php',
        './**/*.css',
        './**/*.html',
        '!node_modules/'
      ]
    }
  };

  config.uglifyJs = {
    outputName: '',
    settings: {}
  };

  config.watch = {
    scripts:  'browserify',
    styles:   'sass',
    symbols:  'symbols',
    images:   'images',
    sprites:  'sprites',
    static:   'static'
  };

  config.init = {
    srcDir: p.join(p.dirname(module.filename),'/_src'),
    manifestPath: './package.json',
    gulpfile: './gulpfile.js',
    dependencies: ['sassqwatch'],
    devDependencies: ['gulp', 'browserify-ejs', 'browserify-shim'],
    stuffToAppend: {
      'browser': config.browserify.aliases,
      'browserify-shim': config.browserify.shim
    }
  };

  config.default = {
    tasks: ['browserSync', 'symbols', 'sass', 'sprites', 'images', 'browserify']
  };

  config.production = {
    tasks: ['minifyCss', 'uglifyJs']
  };

  config = merge(config, options);

  return config;
};