var uid = 0;

export function Dep() {
    this.subs = [];
    this.id = uid++;
}

Dep.prototype = {
    depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    },
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs && this.subs.forEach(function(sub) {
            sub.update();
        })
    }
}