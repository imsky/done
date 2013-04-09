define([
	'flight/lib/component',
	'data'
],
function(def, Data){
	function component(){
		this.defaultAttrs({
				'clear': '#clearbutton'
			})
		this.after("initialize", function(){
			this.on("click", {
				"clear": function(){
					this.trigger("clear")
				}
			})
		})
	}
	return def(component)
}
)