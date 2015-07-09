var p = require('path');
var merge = require('./util/deepishMerge.js');

// Setup objects
var source    = {};
var assets    = {};
var srcs      = {};
var config    = {};

// Globs
var globs = {
	images:   '**/*.+(png|jpg|jpeg|svg|gif)',
	scripts:  '**/*.+(js|ejs)',
	sprites:  '**/*.+(png)',
	styles:   '**/*.+(sass|scss)',
	symbols:  '*.+(svg)',
	static:   '**/*.+(html)'
};

var _assets = function(asset) {
	return config.scaffold.assets[asset].charAt(0) === '/'
		? p.join(appDir, config.scaffold.assets[asset])
		: p.join(assets.root, config.scaffold.assets[asset]);
};

// Gulp options/settings for tasks.
module.exports = function(base, options) {

	// Paths
	appDir = base;

	// Scaffold folders
	config.scaffold = {
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
			sprites:  'images/sprites',
			scripts:  'js',
			styles:   'css',
			symbols:  'fonts/symbols',
			static:   '/'
		}
	};

	// merge the user scaffold with the defaults
	if (options.scaffold) {
		config.scaffold = merge(config.scaffold, options.scaffold);
	}

	// Source Directory
	source.root     = p.join(appDir, config.scaffold.source.root);
	source.images   = p.join(source.root, config.scaffold.source.images);
	source.scripts  = p.join(source.root, config.scaffold.source.scripts);
	source.sprites  = p.join(source.root, config.scaffold.source.sprites);
	source.styles   = p.join(source.root, config.scaffold.source.styles);
	source.symbols  = p.join(source.root, config.scaffold.source.symbols);
	source.static   = p.join(source.root, config.scaffold.source.static);
	source.tpl      = p.join(source.symbols, 'tpl');

	// Assets Directory
	assets.root     = p.join(appDir, config.scaffold.assets.root);
	assets.images   = _assets('images');
	assets.scripts  = _assets('scripts');
	assets.sprites  = _assets('sprites');
	assets.styles   = _assets('styles');
	assets.symbols  = _assets('symbols');
	assets.static   = _assets('static');

  // Srcs for gulp.src
  srcs.images     = p.join(source.images, globs.images);
  srcs.scripts    = p.join(source.scripts, globs.scripts);
  srcs.sprites    = p.join(source.sprites, globs.sprites);
  srcs.styles     = p.join(source.styles, globs.styles);
  srcs.symbols    = p.join(source.symbols, globs.symbols);
  srcs.static     = p.join(source.static, globs.static);

	// Images
	config.images = {
		settings: {
			progressive: true,
			optimizationLevel: 4
		}
	};

	// Browserify
	config.browserify = {
		debug: false,
		bundles: [],
		transform: ['browserify-shim', 'browserify-ejs'],
		aliases: { "waitFor": './' + p.join(config.scaffold.source.root, config.scaffold.source.scripts, "/lib/waitFor.js") },
		shim: { "jquery": "global:$" }
	};

	// Sprites
	config.sprites = {
		destSass: p.join(source.styles, 'helpers'),
		settings: {
			retina: true,
			style: '_sprites.scss',
			cssPath: assets.sprites,
			processor: 'scss',
			orientation: 'binary-tree',
			prefix: 'sprite'
		}
	};

	// Sass
	config.sass = {
		settings: {
			indentedSyntax: true,
			errLogToConsole: true,
			style: 'nested'
		},
		globbing: {
			extensions: ['.scss', '.sass']
		}
	};

	// Auto Prefixer
	config.autoprefixer = {
		browsers: [
			'last 2 versions',
			'safari 5',
			'ie 8',
			'ie 9',
			'android 4'
		],
		cascade: true
	};

	// Symbols
	config.symbols = {
		tplCss: p.join(source.tpl, 'symbols.tpl.css'),
		tplSass: p.join(source.tpl, 'symbols.tpl.scss'),
		tplHtml: p.join(source.tpl, 'symbols.tpl.html'),
		destSass: p.join(source.styles, 'helpers'),
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

	// Static
	config.static = {
		extension: ".html",
		settings: {
			prefix: '@@',
			basepath: '/'
		},
	};

	// BrowserSync
	config.browserSync = {
		useBrowserSync: true,
		// See http://www.browsersync.io/docs/options/ for a complete list of configuration options
		config: {
			server: appDir,
			open: true,
			notify: false,
			reloadOnRestart: true,
			files: [
				p.join(assets.root, '**/*'),
				p.join(appDir, '**/*.php'),
			]
		}
	};

	// Default Tasks
	config.default = {
		tasks: ['browserSync', 'symbols', 'sass', 'sprites', 'images', 'browserify']
	};

	// Watch
	config.watch = {
		scripts:  'browserify', 
		styles:   'sass',
		symbols:  'symbols',
		images:   'images',
		sprites:  'sprites'
	};

	config.init = {
		srcDir: p.join(p.dirname(module.filename),'_src'),
		cwd: appDir,
		manifestPath: p.join(appDir, 'package.json'),
		gulpfile: p.join(appDir, 'gulpfile.js'),
		bundlesPath: './' + config.scaffold.source.root + '/' + config.scaffold.source.scripts + '/config/bundles.js',
		dependencies: ['sassqwatch'],
		devDependencies: ['gulp', 'browserify-ejs', 'browserify-shim'],
		stuffToAppend: {
			'browserify': {
				'transform': config.browserify.transform,
			},
			'browser': config.browserify.aliases,
			'browserify-shim': config.browserify.shim
		}
	};

	// merge the default config with the custom settings
	config = merge(config, options);

	// expose the scaffold and paths after the merge
	// so that it can't be overridden
	config.source    = source;
	config.assets    = assets;
	config.srcs      = srcs;

	return config;
};