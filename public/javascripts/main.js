$(document).ready(function() {
  var $alert = $('.alert');
  $alert.hide();
  $alert.on('error', function(event, data){
    $alert.html(data)
    $alert.addClass('alert-danger');
    $alert.show();
  });
  $alert.on('success', function(event, data) {
    $alert.html(data);
    $alert.addClass('alert-info');
    $alert.show();
  })
  $('.task-delete').click(function(event) {
    console.log (event.target.dataset.taskId)
    $.ajax({
      type: 'DELETE',
      url: '/tasks/' + event.target.dataset.taskId,
      success: function(response) {
        $(event.target).parent().parent().remove();
        $alert.trigger('success', 'Task was removed.');
      },
      error: function(error) {
        $alert.trigger('error', error);
      }
    })
  });
})