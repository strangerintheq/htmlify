var htmlify = (function() {

    var Q = '"';

    return function (json, props) {
        return bush(typeof json, json, true, props).expandOrCollapse();
    };

    function bush(name, json, last, props) {

        props.size = props.size || 15;
        props.color = props.color || 'black';
        props.keyColor = props.keyColor || 'brown';

        var isObject = typeof json === 'object' && json !== null;
        var isArray = Array.isArray(json);
        var start = isArray ? '[' : '{';
        var end = isArray ? ']' : '}';
        !last && (end += ',');

        var node = document.createElement('div');
        node.style.fontFamily = 'Arial, sans-serif';
        node.style.fontSize = props.size + 'px';
        node.style.color = props.color;
        node.style.lineHeight = Math.floor(props.size * 1.3) + 'px';

        var content = document.createElement('div');
        content.style.marginLeft = props.size + 'px';

        if (!isObject) {
            node.appendChild(content).innerHTML = color(name, props.keyColor) +
                ': ' + (typeof json === 'string' ? Q + json + Q : json);
            return node;
        }

        json && Object.keys(json).forEach(function (key, i, arr) {
            content.appendChild(bush(Q + key + Q, json[key],
                i === arr.length - 1, props));
        });

        var header = document.createElement('div');
        var footer = document.createElement('div');
        var title = document.createElement('span');

        var expander = createExpander();
        footer.style.marginLeft = props.size + 'px';
        title.innerHTML = color(name, props.keyColor) + ': ' + start;

        header.appendChild(expander);
        header.appendChild(title);
        node.appendChild(header);
        node.appendChild(content);
        node.appendChild(footer);
        node.expandOrCollapse = expandOrCollapse;
        expandOrCollapse();
        return node;

        function createExpander() {
            var expander = document.createElement('span');
            expander.innerHTML = '&#x25BC;';
            expander.style.cursor = "pointer";
            expander.style.userSelect = "none";
            expander.style.display = "inline-block";
            expander.style.width = props.size + 'px';
            expander.addEventListener('click', expandOrCollapse);
            return expander;
        }

        function expandOrCollapse() {
            expander.innerHTML = node.collapsed ? '&#x25BC;' : '&#x25B6;';
            content.style.display = node.collapsed ? 'block' : 'none';
            title.innerHTML = color(name, props.keyColor) + ': ' +
                start + (node.collapsed ? '' : Object.keys(json).length + end);
            footer.innerHTML = node.collapsed ? end : '';
            node.collapsed = !node.collapsed;
            return node;
        }
    }

    function color(text, color) {
        return '<span style="color:' + color + '">' + text + '</span>';
    }
})();