module.exports = function(gulp, plugins, config) {
	return function () {
		return gulp.src(config.taskSrc('symbols'))
			.pipe(plugins.iconfont(config.symbols.settings))
			.on('codepoints', function(codepoints, options) {
				// Options for when the scss/sass files are being generated.
				var optionsSass = {
					glyphs: codepoints,
					fontName: 'symbols',
					fontPath: config.symbols.fontPath,
					className: 'symbol'
				};
				// Options for when the preview files are being generated.
				var optionsHtml = {
					glyphs: codepoints,
					fontName: 'symbols',
					fontPath: '',
					className: 'symbol'
				};
				// Generate sass/scss file for symbols
				gulp.src(config.symbols.tplSass)
					.pipe(plugins.consolidate('lodash', optionsSass))
					.pipe(plugins.rename(config.symbols.renameSass))
					.pipe(gulp.dest(config.symbols.destSass));
				// Generate HTML file for symbol preview
				gulp.src(config.symbols.tplHtml)
					.pipe(plugins.consolidate('lodash', optionsHtml))
					.pipe(plugins.rename({ basename:'symbols' }))
					.pipe(gulp.dest(config.assetDir('symbols')));
				// Generate css file for HTML preview
				gulp.src(config.symbols.tplCss)
					.pipe(plugins.consolidate('lodash', optionsHtml))
					.pipe(plugins.rename({ basename:'symbols' }))
					.pipe(gulp.dest(config.assetDir('symbols')));
			})
			.pipe(gulp.dest(config.assetDir('symbols')))
			.pipe(plugins.debug({title: 'Symbols Created:'}));
	};
};
