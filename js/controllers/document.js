define([
		'flight/lib/component',
		'data',
		'templates',
], function (def, Data, Templates) {
	function component() {
		var minutes = Math.floor((new Date()).getTime() / 1000 / 60);

		this.defaultAttrs({
			'settings-button': "#settings-button"
		})

		this.after("initialize", function () {

			var that = this;

			this.on("click", {
				'settings-button': function (e) {
					$("body").toggleClass("settings")
					e.preventDefault();
				}
			})

			this.on("addTask", function (evt, task) {
				if (Data.validateTask(task)) {
					var id = Data.push(task)
					this.trigger("attachTask", id)
				} else {
					this.trigger("error", {
						text: "Task title needs to filled in and/or task time should be valid"
					})
				}
			})

			this.on("importTasks", function(){
				Data.clear()
				Data.load()
				if(Data.count() > 0){
					var tasks = Data.tasks()
					for(i = 0; i < tasks.length; i++){
						if(Data.validateTask(tasks[i])){
							this.trigger("attachTask", tasks[i].id)
						}
					}
				}
			})

			this.on("pause", function () {
				Data.setActive(null)
				this.trigger("update")
			})

			this.on("complete", function (evt, task) {
				Data.setFirstActive(task)
				this.trigger("update")
			})

			this.trigger("importTasks")

			setInterval(function () {
				var m = Math.floor((new Date()).getTime() / 1000 / 60);
				if (m > minutes) {
					minutes = m;
					Data.reduceMinutes();
					that.trigger("update")
				}
			}, 5000)
		})
	}
	return def(component)
})