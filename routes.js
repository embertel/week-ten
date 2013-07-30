var express = require('express');
var Retro = require('./db');
var mongoose = require('mongoose');

module.exports = function(app){

	app.use(express.bodyParser());

	// retro submission form
	app.get('/', function (req, res){
		res.render('form.jade');
	});

	// view JSON list of all retros
	app.get('/retro', function (req, res){
		Retro.find(function (err, retros){
		  	if (err) console.log('Error finding db contents.');
		  	res.json(200, retros);
		});
	});

	// view single retro
	app.get('/retro/:id', function (req, res){
		Retro.findById(req.params.id, function (err, retro){
			if(err) console.log('Error: failed to find retro id ' + req.params.id);
			res.json(200, retro);
		});
	});

	// update specified retro
	app.patch('/retro/:id', function (req, res){
		Retro.findById(req.params.id, function (err, retro){
			if(err) console.log('Error: failed to find retro id ' + req.params.id);

			if(req.body.title) retro.title = req.body.title;
			if(req.body.team) retro.team = req.body.team;
			if(req.body.description) retro.description = req.body.description;

			retro.save(function (err, retro){
				if(err) console.log('Error: something messed up while updating retro id' + req.params.id);
				res.send(retro);
			});
		});
	});

	// submit new retro
	app.post('/retro', function (req, res){
		var retro = new Retro({
			title: req.body.title, 
			team: req.body.team,
			description: req.body.description
		});
		retro.save(function (err, retro){
		  	if(err) console.log('Error saving to the database.');
		  	res.send(retro);
		});
	});

	// POST to /retro/<id>/action adds retro action
	app.post('/retro/:id/action', function (req, res){
		Retro.findById(req.params.id, function (err, retro){
			if(err) console.log('Error: failed to find retro id ' + req.params.id);
			retro.actions.push({action: req.body.action});
			retro.save(function (err, retro){
				if(err) console.log('Error: something messed up while updating retro id' + req.params.id);
				res.send(retro);
			});
		});
	});

};
