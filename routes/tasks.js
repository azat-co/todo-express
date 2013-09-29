
/*
 * GET users listing.
 */

exports.list = function(req, res, next){
  req.db.tasks.find({}).toArray(function(error, tasks){
    if (error) return next(error);    
    res.render('tasks', {
      title: 'List of tasks to do',
      tasks: tasks || []
    });
  });

};
exports.add = function(req, res, next){
  console.log (req.body)
  if (!req.body || !req.body.name) return next(new Error('No data provided.'));
  req.db.tasks.save({
    name: req.body.name
  }, function(error, task){
    if (error) return next(error);
    if (!task) return next(new Error('Failed to save.'));
    res.redirect('/tasks');
  })
  
};