require([
		'flight/lib/index',
		'lib/hogan',
		'lib/piecon.min',
		'lib/amplify.store',
		'lib/howler.min',
		'templates',
		'data',
		'controllers/document',
		'controllers/addtask',
		'controllers/error',
		'controllers/task',
		'controllers/tasks',
		'controllers/settings'
], function (Flight, Hogan, _Piecon, Store, Howler, Templates, Data, DocumentController, AddTaskController, ErrorController, TaskController, TasksController, SettingsController) {
	AddTaskController.attachTo("#addtask")
	ErrorController.attachTo("#error")
	TasksController.attachTo("#tasks")
	SettingsController.attachTo("#settings")
	DocumentController.attachTo(document)

	Piecon.setOptions({
		color:"#3B5F7F",
		background: "#ffffff",
		shadow: "#3B5F7F"
	})

	$("#tasks").sortable({
		items: ".task.row",
		handle: ".taskname",
		stop: function(){
			$(document).trigger("tasks:reorder")
		}
	})

})