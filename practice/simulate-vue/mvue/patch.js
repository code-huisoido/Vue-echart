export function patch(vm, node, exp, dir) {
    switch (dir) {
        case 'model':
            return function(node, val) {
                node.value = typeof val === 'undefined' ? '' : val;
            }
        case 'text':
            return function(node, val) {
                node.textContent = typeof val === 'undefined' ? '' : val;
            }
    }
}