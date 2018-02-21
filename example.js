load();

function load() {
    var request = new XMLHttpRequest();
    request.open('get', 'example.json', true);
    request.onreadystatechange = onLoad;
    request.send();

    function onLoad() {
        if (request.readyState !== 4)
            return;

        var json = JSON.parse(request.responseText);
        json.time = new Date().toUTCString();
        var element = document.querySelector('#example');
        var prev = element.querySelector('div');

        var newTree = htmlify(json, {
            expanded: prev ? prev.expanded : {},
            size: 24,
            keyColor: '#a85bb0',
            color: '#c1c1c1'
        });

        element.innerHTML = '';
        element.appendChild(newTree);
    }
}
