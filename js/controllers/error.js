define([
	'flight/lib/component'
],
function(def){
	function component(){
		this.after("initialize", function(){
			var timer = null;
			this.on(document, "error", function(evt, error){
				var node = this.$node;
				this.$node.text(error.text).addClass("visible")
				if(timer != null){
					clearTimeout(timer)
				}
				timer = setTimeout(function(){
					node.removeClass("visible")
					clearTimeout(timer)
				}, 5000)
			})
		})
	}
	return def(component)
}
)