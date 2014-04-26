require([
		'flight/lib/index',
		'lib/piecon.min',
		'lib/amplify.store',
		'lib/howler.min',
		'templates',
		'data',
		'controllers/document',
		'controllers/addtask',
		'controllers/textbar',
		'controllers/task',
		'controllers/tasks'
], function (Flight, _Piecon, Store, Howler, Templates, Data, DocumentController, AddTaskController, TextbarController, TaskController, TasksController, SettingsController, CredentialsController) {
	AddTaskController.attachTo("#addtask")
	TextbarController.attachTo("#error", {event: "error"})
	TextbarController.attachTo("#notification", {event: "notification"})
	TasksController.attachTo("#tasks")
	DocumentController.attachTo(document)

	Piecon.setOptions({
		color:"#3B5F7F",
		background: "#ffffff",
		shadow: "#3B5F7F"
	})
})
