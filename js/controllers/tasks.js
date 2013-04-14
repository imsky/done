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

			var that = this;

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

			this.on(document, "tasks:add", function (evt, task) {
				if (Data.validateTask(task)) {
					var id = Data.push(task)
					this.trigger("task:attach", id)
				} else {
					this.trigger("error", {
						text: "Task title needs to filled in and/or task time should be valid"
					})
				}
			})

			this.on(document, "tasks:import", function(){
				if(Data.count() > 0){
					var tasks = Data.tasks()
					for(i = 0; i < tasks.length; i++){
						if(Data.validateTask(tasks[i])){
							this.trigger("task:attach", tasks[i].id)
						}
					}
				}
				this.trigger("tasks:update")
			})

			this.on(document, "task:attach", function(evt, id){
				this.trigger("emptycheck")
				var el = $(Templates.task.render(Data.get(id)))
				TaskController.attachTo(el, {task: id});
				this.els[id] = el;
				this.$node.append(el);
			})

			this.on(document, "task:delete", function(evt, task){
				$(this.els[task.id]).remove()
				delete this.els[task.id]
				Data.deleteTask(task)
				this.trigger("emptycheck")
				this.trigger("tasks:update")
			})

			this.on(document, "tasks:clear", function(){
				this.els = {}
				Data.deleteAllTasks()
				this.trigger("emptycheck", true)
			})

			this.on(document, "tasks:update", function(){
				if(Data.active()){
					this.$node.addClass("running")
				}
				else{
					this.$node.removeClass("running")
				}
				this.trigger("favicon:update")
			})

			this.on("tasks:reorder", function(){

				var tasks = Data.tasks();
				var index = {}
				var order = []
				var elements = this.$node.find(".task")

				for(i = 0, l = tasks.length; i < l; i++){
					index[tasks[i]["id"]] = i;
				}

				for(i = 0, l = tasks.length; i < l; i++){
					order.push(index[elements.eq(i).data("task")])
				}

				Data.reorder(order)
			})

			this.$node.sortable({
				items: ".task.row",
				handle: ".taskname",
				stop: function(){
					that.trigger("tasks:reorder")
				}
			})
		})
	}
	return def(component)
}
)