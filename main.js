var endpoint = "https://www.jsonstore.io/4e6a69254dd68ec224578223acc3bb77a7b6b64500982a24c104407d68b4a328"

function get_hash() {
    return window.location.hash.substr(1).replace(/\?.*$/, '');
}

function get_url() {
    var query = document.location
                        .toString()
                        .replace(/^.*?\?/, '')
                        .replace(/#.*$/, '')
                        .split('&');
    var $_GET = {};
    for (var i = 0, l = query.length; i < l; i++) {
        var aux = decodeURIComponent(query[i]).split('=');
        $_GET[aux[0]] = aux[1];
    }
    if ("url" in $_GET) {
        return $_GET["url"];
    }
    return undefined;
}

function send_request(url) {
    this.url = url;
    if (url == undefined) {
        console.log("Error: URL is not provided.");
        return;
    }
    this.hash = get_hash();
    console.log("Hash value:", this.hash);
    console.log("URL value:", this.url);
    $.ajax({
        'url': endpoint + "/" + this.hash,
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
    })
    console.log("Done.")
}

if (window.location.hash != "") {
    var hashh = get_hash();
    $.getJSON(endpoint + "/" + hashh, function (data) {
        data = data["result"];
        if (data != null) {
            window.location.href = data;
        } else if (document.location.toString().indexOf('?') !== -1) {
            send_request(get_url());
        }
    });
}