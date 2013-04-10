define([
		'flight/lib/component',
		'data',
		'templates',
], function (def, Data, Templates) {
	function component() {

		function getMinutes(){
			return Math.floor((new Date()).getTime() / 1000 / 60);
		}

		var minutes = getMinutes()

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

			this.on("tasks:pause", function () {
				Data.setActive(null)
				this.trigger("tasks:update")
			})

			this.on("task:play", function(){
				minutes = getMinutes()
			})

			this.on("task:complete", function (evt, task) {
				Data.setFirstActive(task)
				this.trigger("tasks:update")
			})

			this.trigger("tasks:import")

			setInterval(function () {
				var m = getMinutes();
				if (m > minutes) {
					minutes = m;
					Data.reduceMinutes();
					that.trigger("tasks:update")
					Data.persist()
				}
			}, 5000)
		})
	}
	return def(component)
})