http = require('http');
fs = require('fs');
server = http.createServer( function(req, res) {
    if (req.method == 'POST') {
    	console.log('POST: ' + req.url);
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
        	if(body) {
        		console.log(unescape(body));
        	}
        });
        res.writeHead(200, {'Content-Type': 'text/html', "Access-Control-Allow-Origin": "*"});
        res.end('{"status": "ok"}');
    }
    else
    {
    	console.log("GET: " + req.url);
        res.writeHead(200, {'Content-Type': 'text/html', "Access-Control-Allow-Origin": "*"});
        res.end("GET" + req.uri);
    }

});

port = 12001;
host = '127.0.0.1';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);