var http = require('http');
var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function callback () {
  	console.log('Connected to database');
});

require('./routes')(app);

http.createServer(app).listen(3001, function(){
	console.log('Listening on port 3001');
});