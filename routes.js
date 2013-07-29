var express = require('express');
var mongoose = require('mongoose');

module.exports = function(app){

	// db stuff:
	mongoose.connect('mongodb://localhost/test');

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
	  	console.log('connected to database');
	});

	var retroSchema = mongoose.Schema({
	    title: String,
	    team: String
	});

	var Retro = mongoose.model('Retro', retroSchema);

	// route stuff:
	app.use(express.bodyParser());

	app.get('/', function(req, res){
		var body = "Hello world. I've got Express installed.";
		res.setHeader('Content-Type', 'text/plain');
		res.setHeader('Content-Length', body.length);
		res.end(body);
	});

	// When I send a GET to /retro, I want to see a JSON list of retros.
	app.get('/retro', function(req, res){
		console.log('hey there, you hit /retro');
		Retro.find(function (err, retros) {
		  	if (err) console.log('Error finding db contents.');
		  	var body = retros;
		  	res.json(200, body);
		  	console.log(body);
		});
	});

	app.post('/retro', function(req, res){
		var retro = new Retro({ title: req.body.title, team: req.body.team });
		retro.save(function (err, retro) {
		  	if (err) console.log('Error saving to the database.');
		  	console.log(retro);
		});
	});
};
