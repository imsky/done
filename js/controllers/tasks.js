define([
	'flight/lib/component',
	'data',
	'templates',
	'controllers/task'
],
function(def, Data, Templates, TaskController){
	function component(){
		this.after("initialize", function(evt){

			this.els = {}

			var empty = true;

			this.on("emptycheck", function(force){
				if((Data.count() == 0 && !empty)||force==true) {
					this.$node.empty()
					this.$node.append(Templates.emptynotice)
					empty = true
				}
				else if(Data.count() > 0 && empty){
					this.$node.empty()
					empty = false
				}
			})

			this.on(document, "attachTask", function(evt, id){
				this.trigger("emptycheck")
				var el = $(Templates.task.render(Data.get(id)))
				TaskController.attachTo(el, {task: id});
				this.els[id] = el;
				this.$node.append(el);
			})

			this.on(document, "delete", function(evt, task){
				$(this.els[task.id]).remove()
				delete this.els[task.id]
				Data.deleteTask(task)
				this.trigger("emptycheck")
				this.trigger("update")
			})

			this.on(document, "clear", function(){
				this.els = {}
				Data.deleteAllTasks()
				this.trigger("emptycheck", true)
			})
		})
	}
	return def(component)
}
)