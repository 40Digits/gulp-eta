// This file goes in root of your app

var gulp = require('gulp');
var eta = require('gulp-eta');
var config = {};

// Scaffold configuration
config.scaffold = {
  source: {
    root: 'app'
  },
  assets: {
    root: 'public/assets'
  }
};

gulp.tasks = eta(config);