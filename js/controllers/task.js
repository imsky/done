define([
    'lib/flight.min',
    'data',
    'templates'
], function (Flight, Data, Templates) {
    function component() {
        this.defaultAttrs({
            'time': '.tasktime',
            'control': '.controlbutton',
            'delete': '.deletebutton'
        });
        this.after("initialize", function (el, evt) {
            this.task = Data.get(evt.task);

            this.on("click", {
                "control": function (e) {
                    if (this.task == Data.active()) {
                        this.trigger("tasks:pause");
                    } else {
                        this.trigger("tasks:pause");
                        this.trigger("task:play");
                    }
                    e.preventDefault();
                },
                "delete": function (e) {
                    this.trigger("task:delete", this.task);
                    e.preventDefault();
                }
            });

            this.on("task:play", function () {
                Data.setActive(this.task);
                this.trigger("tasks:update");
            });

            this.on(document, "tasks:update", function () {
                if (this.task.minutes == 0) {
                    this.$node.removeClass("active");
                    if (!this.$node.hasClass("finished")) {
                        this.select("time").html(Templates.check);
                        this.$node.addClass("finished");
                    }

                    if (!this.task.complete) {
                        this.task.complete = true;
                        this.trigger("task:complete", this.task);
                    }
                } else {
                    this.select("time").text(this.task.time);
                    if (Data.active() == this.task) {
                        this.$node.addClass("active");
                        this.select("control").html(Templates.pause);
                    } else {
                        this.$node.removeClass("active");
                        this.select("control").html(Templates.play);
                    }
                }
            });

        });
    }
    return Flight.component(component);
}
);