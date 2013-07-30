var express = require('express');
var Retro = require('./db');

module.exports = function(app){

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
		Retro.find(function (err, retros) {
		  	if (err) console.log('Error finding db contents.');
		  	var body = retros;
		  	res.json(200, body);
		});
	});

	app.post('/retro', function(req, res){
		var retro = new Retro({
			title: req.body.title, 
			team: req.body.team,
			description: req.body.description
		});
		retro.save(function (err, retro) {
		  	if (err) console.log('Error saving to the database.');
		  	console.log(retro);
		});
	});
};
