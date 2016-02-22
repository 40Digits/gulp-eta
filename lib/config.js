var p = require('path');
var merge = require('./util/deepishMerge.js');

var config = {
  scaffold: {
    source: {
      root:       '_src',
      images:     'images',
      browserify: 'js',
      sprites:    'sprites',
      sass:       'sass',
      symbols:    'symbols',
      static:     'static'
    },
    assets: {
      root:       'assets',
      images:     'images',
      browserify: 'js',
      sprites:    'images/sprites',
      sass:       '/',
      symbols:    'fonts/symbols',
      static:     '/'
    }
  },
  tools: ['images', 'js', 'sass', 'sprites', 'static', 'symbols', 'browserSync'],
  sourceDir:  sourceDir,
  assetDir:   assetDir,
  taskSrc:    taskSrc,
  watchSrc:   watchSrc
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
    uglify: false,
    bundles: [],
    bundleConfig: p.join(sourceDir('browserify'), 'config/bundles.js'),
    aliases: {
      'waitFor': './' + p.join(config.sourceDir('browserify'), 'lib/waitFor.js')
    },
    shim: { 'jquery': 'global:$' }
  };

  config.sprites = {
    match: '**/*.+(png)',
    destSass: p.join(sourceDir('sass'), 'utils')
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
    margin: 5,
    split: true, // to create multiple sprites by putting images in subdirectories
    name: 'sprite', // for split. ex: sprite-main.png, sprite-blog.png
    style: '_sprites.scss',
    cssPath: p.relative(assetDir('sass'), assetDir('sprites')),
    template: p.join(sourceDir('sprites'), '/template/scss.hbs'),
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
    tplCss: p.join(sourceDir('symbols'), 'template/symbols.tpl.css'),
    tplSass: p.join(sourceDir('symbols'), 'template/symbols.tpl.scss'),
    tplHtml: p.join(sourceDir('symbols'), 'template/symbols.tpl.html'),
    fontPath: p.relative(assetDir('sass'), assetDir('symbols')) + '/',
    destSass: p.join(sourceDir('sass'), 'utils'),
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
    browserify:  'browserify',
    sass:        'sass',
    symbols:     'symbols',
    images:      'images',
    sprites:     'sprites',
    static:      'static'
  };

  config.init = {
    srcDir: p.join(p.dirname(module.filename),'/_src'),
    manifestPath: './package.json',
    gulpfile: './gulpfile.js',
    dependencies: ['sassqwatch'],
    devDependencies: ['gulp', 'browserify-ejs', 'browserify-shim'],
    stuffToAppend: {
      'browser': config.browserify.aliases,
      'browserify-shim': config.browserify.shim,
      'browserify': {
        'transform': [
          'browserify-ejs',
          'browserify-shim'
        ]
      }
    }
  };

  config.default = {
    tasks: ['images', 'browserify', 'sass', 'sprites', 'symbols', 'browserSync']
  };

  config.production = {
    tasks: ['minifyCss', 'uglifyJs']
  };

  config = merge(config, options);

  return config;
};

/**
 * Returns the path to a folder inside of the "_src" directory
 * @param  {String} task  The task name
 * @return {String}       The normalized path
 */
function sourceDir(task) {
  return p.join(config.scaffold.source.root, config.scaffold.source[task]);
}

/**
 * Returns the path to a kind of asset
 * @param  {String} task  The task name
 * @return {String}       The normalized path
 */
function assetDir(task) {
  if (config.scaffold.assets[task].charAt(0) === '/') {
    return './' + config.scaffold.assets[task];
  }
  return p.join(config.scaffold.assets.root, config.scaffold.assets[task]);
}

/**
 * Returns a glob file path to be used by the task as the gulp#src
 * @param  {String} task  The name of the task
 * @return {String}       The normalized path
 */
function taskSrc(task) {
  return p.join(sourceDir(task), config[task].match);
}

/**
 * Returns a glob file path for a folder inside of the src dir
 * @param  {String} task  The name of the task
 * @return {String}       The normalized path
 */
function watchSrc(task) {
  return p.join(config.scaffold.source[task], config[task].match);
}
