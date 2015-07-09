var exec = require('child_process').exec;

module.exports = function(config, plugins) {

  var installDep = function(dep, flag) {
    var command = 'npm install ' + flag + ' ' + dep;

    plugins.util.log("Installing '" + plugins.util.colors.magenta(dep) + "'...");

    exec(command, function(err) {
      if (err) {
        return console.log(err);
      }
      plugins.util.log("Installed '" + plugins.util.colors.green(dep) + "'");
    });
  };

  // Start npm installing
  plugins.util.log("Running '" + plugins.util.colors.magenta('npm install') + "'...");
  // install dependencies
  config.init.dependencies.forEach(function(dep) {
    installDep(dep, '--save');
  });
  // install dev dependencies
  config.init.devDependencies.forEach(function(dep) {
    installDep(dep, '--save-dev');
  });
};