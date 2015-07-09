// This file goes in the root of your Wordpress theme

var gulp = require('gulp');
var eta = require('gulp-eta');
var config = {};

// Scaffold configuration
config.scaffold = {
  assets: {
    // Wordpress needs the stylesheets to be
    // in the root of the theme
    styles: '/'
  }
};

gulp.tasks = eta(config);