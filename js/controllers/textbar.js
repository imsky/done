define([
	'flight/lib/component'
],
function(def){
	function component(){
		this.after("initialize", function(){
			var timer = null;
			this.on(document, this.attr["event"], function(evt, payload){
				var node = this.$node;
				this.$node.text(payload.text).addClass("visible")
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