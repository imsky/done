define(['lib/md5.min', 'lib/gibberish-aes.min', 'lib/base64.min'], function (md5, Gibberish, Base64) {
    var tasks = [];
    var active = null;
    var credentials = null;
    return {
        credentials: function (obj) {
            if (obj) {
                credentials = obj;
            }
            return credentials;
        },
        load: function () {
            this.clear();
            var local = amplify.store("donejs");
            if (local) {
                this.recover(local);
            }
        },
        recover: function (obj) {
            tasks = obj.tasks;
            active = this.get(obj.active);
            this.persist();
        },
        freeze: function () {
            return {
                tasks: tasks,
                active: (active ? active.id : null)
            };
        },
        getKey: function (username, password) {
            return "done-" + Base64.toBase64(md5([username, password, username, password].join("/"))).replace(/[\W]+/g, '');
        },
        encode: function (username, password) {
            return {
                key: this.getKey(username, password),
                value: GibberishAES.enc(JSON.stringify(this.freeze()), password)
            };
        },
        decode: function (object, password) {
            return JSON.parse(GibberishAES.dec(object, password));
        },
        persist: function () {
            amplify.store("donejs", this.freeze());
        },
        push: function (task) {
            var id = (new Date()).getTime();
            task.id = id;
            tasks.push(task);
            this.updateTimes();
            this.persist();
            return id;
        },
        validateTask: function (task) {
            return !isNaN(task.minutes) && task.minutes >= 0 && task.title && task.title.length > 0;
        },
        deleteTask: function (task) {
            if (active == task) {
                this.setActive(null);
            }
            tasks = tasks.filter(function (t) {
                return t !== task;
            });
            this.persist();
        },
        clear: function () {
            tasks = [];
            active = null;
        },
        deleteAllTasks: function () {
            this.clear();
            this.persist();
        },
        reorder: function (order) {
            var t = [];
            order.forEach(function (index) {
                t.push(tasks[index]);
            });
            tasks = t;
            this.persist();
        },
        setActive: function (task) {
            active = task;
            this.persist();
        },
        active: function () {
            return active;
        },
        tasks: function () {
            return tasks;
        },
        get: function (id) {
            for (i = 0; i < tasks.length; i++) {
                if (tasks[i].id == id) {
                    return tasks[i];
                }
            }
            return false;
        },
        count: function () {
            return Object.keys(tasks).length;
        },
        reduceMinutes: function () {
            if (!active) return;
            active.minutes -= 1;
            this.updateTimes();
            this.persist();
        },
        minutesToText: function (m) {
            var hours = Math.floor(m / 60);
            var minutes = Math.floor(m % 60);
            var time = null;
            if (m > 0) {
                time = hours + "h";
                if (hours == 0) {
                    time = minutes + "m";
                } else if (hours > 0 && minutes > 0) {
                    time += " " + minutes + "m";
                }
            }
            return time;
        },
        updateTimes: function () {
            tasks.forEach(function (task) {
                task.time = this.minutesToText(task.minutes);
            }, this);
        }
    };
});