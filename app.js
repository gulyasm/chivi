http = require('http');
fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

function validParameters() {
	return argv.port;
}

function usage() {
	console.log("Usage: npm start --port 12001");
}


var port = argv.port;
if(!validParameters()) {
	usage();
	return;
}
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

var host = '127.0.0.1';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);