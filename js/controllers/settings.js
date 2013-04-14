define([
	'flight/lib/component'
],
function(def){
	function component(){
		this.defaultAttrs({
				'clear': '#clearbutton',
				'open': '#openbutton',
				'save': '#savebutton',
				'big': '#bigbutton'
			})
		this.after("initialize", function(){
			this.on("click", {
				"clear": function(){
					this.trigger("tasks:clear")
				},
				"open": function(){
					this.trigger("tasks:open")
				},
				"save": function(){
					this.trigger("tasks:save")
				},
				"big": function(){
					this.trigger("tasks:big")
				}
			})
		})
	}
	return def(component)
}
)