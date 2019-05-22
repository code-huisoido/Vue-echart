(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.MVue = factory());
}(this, function () { 'use strict';

    function patch(vm, node, exp, dir) {
        switch (dir) {
            case 'model':
                return function (node, val) {
                    node.value = typeof val === 'undefined' ? '' : val;
                };
            case 'text':
                return function (node, val) {
                    node.textContent = typeof val === 'undefined' ? '' : val;
                };
        }
    }

    var uid = 0;

    function Dep() {
        this.subs = [];
        this.id = uid++;
    }

    Dep.prototype = {
        depend: function depend() {
            if (Dep.target) {
                Dep.target.addDep(this);
            }
        },

        addSub: function addSub(sub) {
            this.subs.push(sub);
        },
        notify: function notify() {
            this.subs && this.subs.forEach(function (sub) {
                sub.update();
            });
        }
    };

    function Watcher(vm, exp, patchFn) {
        this.depIds = {};
        this.$patchFn = patchFn;
        this.$vm = vm;
        this.getter = this.parsePath(exp);
        this.value = this.get();
    }

    Watcher.prototype = {
        update: function update() {
            this.run();
        },

        run: function run() {
            var oldVal = this.value;
            var newVal = this.get();
            if (oldVal === newVal) {
                return;
            }
            this.$patchFn.call(this.$vm, newVal);
        },
        addDep: function addDep(dep) {
            if (this.depIds.hasOwnProperty(dep.id)) {
                return;
            }
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        },
        get: function get() {
            Dep.target = this;
            var value = this.getter.call(this.$vm, this.$vm._data);
            Dep.target = null;
            return value;
        },
        parsePath: function parsePath(path) {
            var segments = path.split('.');

            return function (obj) {
                for (var i = 0; i < segments.length; i++) {
                    if (!obj) return;
                    obj = obj[segments[i]];
                }
                return obj;
            };
        }
    };

    var directives = {
        _bind: function _bind(vm, exp, patchFn) {
            new Watcher(vm, exp, patchFn);
        },

        _link: function _link(vm, node, exp, dir) {
            var patchFn = patch(vm, node, exp, dir);
            patchFn && patchFn(node, vm._getVal(exp));

            this._bind(vm, exp, function (value) {
                patchFn && patchFn(node, value);
            });
        },

        model: function model(vm, node, exp) {
            this._link(vm, node, exp, 'model');

            var val = vm._getVal(exp);
            node.addEventListener('input', function (e) {
                var newVal = e.target.value;
                if (newVal === val) return;
                vm._setVal(exp, newVal);
                val = newVal;
            });
        },

        text: function text(vm, node, exp) {
            this._link(vm, node, exp, 'text');
        }

    };

    function Compile(vm, el) {
        this.$vm = vm;
        el = this.$el = this.isElementNode(el) ? el : document.querySelector(el);

        if (!el) {
            return;
        }

        this._update(el);
    }
    Compile.prototype = {

        _update: function _update(el) {
            this.$fragment = document.createDocumentFragment();
            this.createElm(el);
            this.compileElm();
            el.appendChild(this.$fragment);
        },

        createElm: function createElm(node) {
            var childNode = node.firstChild;
            if (childNode) {
                this.$fragment.appendChild(childNode);
                this.createElm(node);
            }
        },

        compileElm: function compileElm(childNodes) {
            var _this = this;

            var reg = /\{\{(.*)\}\}/;
            if (!childNodes) {
                console.log(this.childNodes);
                childNodes = this.$fragment.childNodes;
            }

            [].slice.call(childNodes).forEach(function (node) {
                if (node.childNodes.length > 0) {
                    _this.compileElm(node.childNodes);
                }

                if (_this.isElementNode(node)) {
                    if (reg.test(node.textContent)) {
                        _this.compileTextNode(node, RegExp.$1);
                    }

                    _this.compileElmNode(node);
                }
            });
        },

        compileElmNode: function compileElmNode(node) {
            var attrs = [].slice.call(node.attributes),
                $this = this;

            attrs.forEach(function (attr) {
                if (!$this.isDirective(attr.nodeName)) {
                    return;
                }

                var exp = attr.value;
                directives.model($this.$vm, node, exp);
                node.removeAttribute(attr.name);
            });
        },

        compileTextNode: function compileTextNode(node, exp) {
            directives.text(this.$vm, node, exp);
        },

        isDirective: function isDirective(attrNodeName) {
            return attrNodeName.indexOf('v-') === 0;
        },

        isElementNode: function isElementNode(node) {
            return node.nodeType === 1;
        }
    };

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function observer(value) {
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
            return;
        }

        var ob = new Observer(value);
    }

    function Observer(data) {
        this.data = data;
        this.walk();
    }

    Observer.prototype = {
        walk: function walk() {
            var $this = this;
            var keys = Object.keys(this.data);
            keys.forEach(function (key) {
                $this.defineReactive(key, $this.data[key]);
            });
        },

        defineReactive: function defineReactive(key, value) {
            var dep = new Dep();
            Object.defineProperty(this.data, key, {
                enumerable: true,
                configurable: true,
                set: function set(newValue) {
                    if (value === newValue) {
                        return;
                    }
                    value = newValue;
                    dep.notify();
                },
                get: function get() {
                    dep.depend();
                    return value;
                }
            });
        }
    };

    function MVue(options) {
        this.$options = options;
        this._data = options.data || {};

        observer(this._data);

        new Compile(this, this.$options.el);
    }

    MVue.prototype = {
        _getVal: function _getVal(exp) {
            return this._data[exp];
        },
        _setVal: function _setVal(exp, newVal) {
            this._data[exp] = newVal;
        }
    };

    return MVue;

}));
