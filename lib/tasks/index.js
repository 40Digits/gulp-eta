var requireDirectory = require('require-directory');

// expose all the tasks in this directory
module.exports = requireDirectory(module);