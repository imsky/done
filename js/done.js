require([
		'flight/lib/index',
		'lib/hogan',
		'templates',
		'data',
		'controllers/document',
		'controllers/addtask',
		'controllers/error',
		'controllers/task',
		'controllers/tasks',
		'controllers/settings'
], function (Flight, Hogan, Templates, Data, DocumentController, AddTaskController, ErrorController, TaskController, TasksController, SettingsController) {
	AddTaskController.attachTo("#addtask")
	ErrorController.attachTo("#error")
	TasksController.attachTo("#tasks")
	SettingsController.attachTo("#settings")
	DocumentController.attachTo(document)
})