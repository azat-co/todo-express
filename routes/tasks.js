
/*
 * GET users listing.
 */

exports.list = function(req, res, next){
  req.db.tasks.find({}).toArray(function(error, tasks){
    // console.log (tasks)
    if (error) return next(error);
    res.render('tasks', {
      title: 'Todo List',
      tasks: tasks || []
    });
  });

};
exports.add = function(req, res, next){
  // console.log (req.body)
  if (!req.body || !req.body.name) return next(new Error('No data provided.'));
  req.db.tasks.save({
    name: req.body.name
  }, function(error, task){
    if (error) return next(error);
    if (!task) return next(new Error('Failed to save.'));
    res.redirect('/tasks');
  })

};
exports.completed = function(req, res, next) {
  req.db.tasks.find({completed: true}).toArray(function(error, tasks) {
    res.render('tasks_completed', {
      title: 'Completed',
      tasks: tasks || []
    });
  });
}
exports.del = function(req, res, next) {
  req.db.tasks.removeById(req.task._id, function(error, count) {
    if (error) return next(error);
    if (count !==1) return next(new Error('Something went wrong.'));
    res.send(200);
  });
}