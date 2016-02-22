// This file goes in root of your app

var gulp = require('gulp');
var eta = require('gulp-eta');
var config = {};

// Scaffold configuration
config.scaffold = {
  source: {
    root: 'craft/_src'
  },
  assets: {
    root: 'public/assets',
    sass: 'css'
  }
};

config.default = {
  tasks: ['browserSync', 'symbols', 'sass', 'sprites', 'images', 'browserify']
}

eta(gulp, config);