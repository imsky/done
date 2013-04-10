define([
	'flight/lib/component'
],
function(def){
	function component(){
		this.defaultAttrs({
				'clear': '#clearbutton'
			})
		this.after("initialize", function(){
			this.on("click", {
				"clear": function(){
					this.trigger("tasks:clear")
				}
			})
		})
	}
	return def(component)
}
)