// This file goes in root of your app

var gulp = require('gulp');
var eta = require('gulp-eta');
var config = {};

// Scaffold configuration
config.scaffold = {
  source: {
    root: 'resources/_src'
  },
  assets: {
    root: 'public/assets',
    sass: 'css'
  }
};

eta(gulp, config);
