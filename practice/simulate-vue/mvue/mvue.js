import { Compile } from './compile.js';
import { observer } from './observer.js';

function MVue(options) {
    this.$options = options;
    this._data = options.data || {};

    observer(this._data);

    new Compile(this, this.$options.el);
}

MVue.prototype = {
    _getVal: function(exp) {
        return this._data[exp];
    },
    _setVal: function(exp, newVal) {
        this._data[exp] = newVal;
    }
}

export default MVue;