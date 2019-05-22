import { directives } from './directive.js';

export function Compile(vm, el) {
    this.$vm = vm;
    el = this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (!el) {
        return;
    }

    this._update(el);
};

Compile.prototype = {

    _update: function(el) {
        this.$fragment = document.createDocumentFragment();
        this.createElm(el);
        this.compileElm();
        el.appendChild(this.$fragment);
    },

    createElm: function(node) {
        var childNode = node.firstChild;
        if (childNode) {
            this.$fragment.appendChild(childNode);
            this.createElm(node);
        }
    },

    compileElm: function(childNodes) {
        var reg = /\{\{(.*)\}\}/;
        if (!childNodes) {
            console.log(this.childNodes);
            childNodes = this.$fragment.childNodes;
        }

        [].slice.call(childNodes).forEach(node => {
            if (node.childNodes.length > 0) {
                this.compileElm(node.childNodes);
            }

            if (this.isElementNode(node)) {
                if (reg.test(node.textContent)) {
                    this.compileTextNode(node, RegExp.$1);
                }

                this.compileElmNode(node);
            }
        })
    },

    compileElmNode: function(node) {
        var attrs = [].slice.call(node.attributes),
            $this = this;

        attrs.forEach(function(attr) {
            if (!$this.isDirective(attr.nodeName)) {
                return;
            }

            var exp = attr.value;
            directives.model($this.$vm, node, exp);
            node.removeAttribute(attr.name);
        });
    },

    compileTextNode: function(node, exp) {
        directives.text(this.$vm, node, exp);
    },

    isDirective: function(attrNodeName) {
        return attrNodeName.indexOf('v-') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType === 1;
    }
}