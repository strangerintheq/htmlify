var htmlify = (function() {

    var SIZE = '18px';
    var KEY_COLOR = '#099919';

    return function (json) {
        return bush(typeof json, json, true);
    };

    function bush(name, json, last) {

        var isObject = typeof json === "object";
        var isArray = Array.isArray(json);
        var start = isArray ? '[' : '{';
        var end = isArray ? ']' : '}';
        !last && (end += ',');

        var node = document.createElement('div');
        node.style.fontFamily = "Arial, sans-serif";
        node.style.fontSize = node.style.lineHeight = SIZE;

        var content = document.createElement('div');
        content.style.marginLeft = SIZE;

        if (!isObject) {
            content.innerHTML = color(name, KEY_COLOR) + ': ' + json;
            node.appendChild(content);
            return node;
        }

        Object.keys(json).forEach(function (key, i, arr) {
            content.appendChild(bush(key, json[key], i === arr.length - 1));
        });

        var expander = document.createElement('span');
        expander.innerHTML = '&#x25BC;';
        expander.style.cursor = "pointer";
        expander.style.userSelect = "none";
        expander.style.display = "inline-block";
        expander.style.width = SIZE;
        expander.addEventListener('click', expandOrCollapse);

        var title = document.createElement('span');
        title.innerHTML = color(name, KEY_COLOR) + ': ' + start;

        var header = document.createElement('div');
        header.appendChild(expander);
        header.appendChild(title);

        var footer = document.createElement('div');
        footer.style.marginLeft = SIZE;
        footer.innerHTML = end;

        node.appendChild(header);
        node.appendChild(content);
        node.appendChild(footer);

        return node;

        function expandOrCollapse() {
            var collapsed = !header.classList.toggle('json-node-header-collapsed');
            expander.innerHTML = collapsed ? '&#x25BC;' : '&#x25B6;';
            content.style.display = collapsed ? 'block' : 'none';
            title.innerHTML = color(name, KEY_COLOR) + ': ' + start + (collapsed ? '' : '...' + end);
            footer.innerHTML = collapsed ? end : '';
        }
    }

    function color(text, color) {
        return '<span style="color:' + color + '">' + text + '</span>';
    }
})();