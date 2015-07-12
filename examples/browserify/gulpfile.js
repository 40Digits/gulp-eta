// This is an example of how to set up Browserify bundles
// Please note that running `gulp init` will set up the base bundle config for you
// This is only an example of how to set it up without using Eta to create your source files

var gulp = require('gulp');
var eta = require('gulp-eta');
var config = {};

// Scaffold configuration
config.browserify = {
  // add 'babelify' as a transform
  // to do some sweet future-coding
  transform: ['browserify-shim', 'browserify-ejs', 'babelify'],
  // add your bundles to this array
  bundles: [
    {
      // the name of the bundle file that will
      // be created in the assets folder
      outputName: 'main.js',
      entries: [
        './_src/js/modules/myFirstModule.js',
        './_src/js/modules/mySecondModule.js',
        './_src/js/view/myView.js'
      ]
    },
    {
      outputName: 'blog.js',
      entries: [
        './_src/js/modules/myFirstModule.js',
        './_src/js/modules/myThirdModule.js',
        './_src/js/view/blog.js'
      ]
    }
  ]
};

eta(gulp, config);