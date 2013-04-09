define([
	'flight/lib/component',
	'data',
	'templates'
],
function(def, Data, Templates){
	function component(){
		this.defaultAttrs({
			'time': '.tasktime',
			'control': '.controlbutton',
			'delete': '.deletebutton'
		})
		this.after("initialize", function(evt){
			this.task = Data.get(evt.task);

			this.on("click", {
				"control": function(e){
					if(this.task == Data.active()){
						this.trigger("pause")
					}
					else{
						this.trigger("pause")
						this.trigger("play")
					}
					e.preventDefault();
				},
				"delete": function(e){
					this.trigger("delete", this.task)
					e.preventDefault();
				}
			})

			this.on("play", function(){
				Data.setActive(this.task)
				this.trigger("update")
			})

			this.on(document, "update", function(){
				if(this.task.minutes == 0){
					if(!this.task.complete){
						this.select("time").html("✔")
						this.$node.addClass("finished")
						this.task.complete = true;
						this.trigger("complete", this.task)
					}
				}
				else{
					this.select("time").text(this.task.time)
					this.trigger("update_button")
				}
			})

			this.on("update_button", function(){
				if(Data.active() == this.task){
					this.select("control").html(Templates.pause)
				}
				else{
					this.select("control").html(Templates.play)
				}
			})

		})
	}
	return def(component)
}
)