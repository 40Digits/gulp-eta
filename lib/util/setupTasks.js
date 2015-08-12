var tasks = require('../tasks');

// convenience function to get tasks that this task depends on
var taskDependencies = function(gulp, config, task) {
  var thisTask = config[task];

  // if there are "before" actions for this task
  if (thisTask && thisTask.before) {
    // return gulp-ready task dependencies array
    return thisTask.before.map(function(action) {
      // if this task is simply a reference to a preconfigured task
      if (typeof action === 'string') {
        return action;
      // if this task is an object then setup a new task
      } else {
        gulp.task(action.name, action.action);
        return action.name;
      }
    });
  } else {
    return [];
  }
};

module.exports = function(gulp, plugins, config) {
  // create the tasks
  Object.keys(tasks).forEach(function(task) {
    gulp.task(task, taskDependencies(gulp, config, task), tasks[task](gulp, plugins, config));
  });

  // tasks that simply use other tasks
  gulp.task('default', config.default.tasks);
  gulp.task('production', config.production.tasks);

  return gulp;
};
