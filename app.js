var express = require('express');
var app = express();

app.get('/', function(req, res){
	var body = "hello world. i've got expressjs installed.";
	res.setHeader('Content-Type', 'text/plain');
	res.setHeader('Content-Length', body.length);
	res.end(body);
});

app.listen(3001);
console.log('Listening on port 3001');