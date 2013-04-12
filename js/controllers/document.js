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
				this.trigger("favicon:update")
			})

			this.on("task:complete", function (evt, task) {
				Data.setActive(null)
				this.trigger("tasks:update")
				this.trigger("notification:complete")
			})

			this.on("favicon:update", function(){
				var active = Data.active();
				if(active && active._minutes && active.minutes){
					var progress = 100 * (1 - (active.minutes/active._minutes).toFixed(2))
					Piecon.setProgress(progress)
				}
				else{
					Piecon.reset()
				}
			})

			this.on("notification:complete", function(){
				var t = document.title;
				var nt = t + " " +  Templates.check
				var count = 10;
				var sound = new Howl({
					urls: ['audio/done.mp3', 'audio/done.ogg']
				}).play()

				var i = setInterval(function(){
					if(count > 0 && count % 2 == 0){
						document.title = nt;
					}
					else if(count > 0 && count % 2 == 1){
						document.title = t;
					}
					else{
						clearTimeout(i)
						document.title = t;
					}
					count--;
				}, 1000)
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