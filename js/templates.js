define(['lib/hogan'], function(){
	return {
		check: $("<div />").html("&#10004;").html(),
		emptynotice: '<span class="notice">get started by adding a task</span>',
		pause: '<span class="iconic pause"></span>',
		play: '<span class="iconic play"></span>',
		task: window.Hogan.compile(
			'<div class="task row" data-task="{{id}}"><div class="col taskname">{{title}}</div><div class="col tasktime">{{time}}</div><div class="col button taskbutton controlbutton icon"><span class="iconic play"></span></div><div class="col button taskbutton deletebutton icon"><span class="iconic x"></span></div></div>')
	}
})
