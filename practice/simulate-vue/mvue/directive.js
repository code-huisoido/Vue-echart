import { patch } from './patch.js';
import { Watcher } from './watcher.js';

export var directives = {
    _bind: function(vm, exp, patchFn) {
        new Watcher(vm, exp, patchFn);
    },

    _link: function(vm, node, exp, dir) {
        var patchFn = patch(vm, node, exp, dir);
        patchFn && patchFn(node, vm._getVal(exp));

        this._bind(vm, exp, function(value) {
            patchFn && patchFn(node, value);
        })
    },

    model: function(vm, node, exp) {
        this._link(vm, node, exp, 'model');

        var val = vm._getVal(exp);
        node.addEventListener('input', function(e) {
            var newVal = e.target.value;
            if (newVal === val) return;
            vm._setVal(exp, newVal);
            val = newVal;
        });
    },

    text: function(vm, node, exp) {
        this._link(vm, node, exp, 'text');
    }

}