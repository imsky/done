require([
		'flight/lib/index',
		'lib/piecon.min',
		'lib/amplify.store',
		'lib/howler.min',
		'lib/gibberish-aes.min',
		'templates',
		'data',
		'controllers/document',
		'controllers/addtask',
		'controllers/error',
		'controllers/task',
		'controllers/tasks',
		'controllers/settings'
], function (Flight, _Piecon, Store, Howler, GibberishAES, Templates, Data, DocumentController, AddTaskController, ErrorController, TaskController, TasksController, SettingsController) {
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

	window.d = Data;
})