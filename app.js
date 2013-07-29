var http = require('http');
var express = require('express');
var app = express();

require('./routes')(app);

http.createServer(app).listen(3001, function(){
	console.log('Listening on port 3001');
});