var mongoose = require('mongoose');

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

module.exports = function(){
	var Retro = mongoose.model('Retro', retroSchema);
};
