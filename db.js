var mongoose = require('mongoose');

var actionsSchema = mongoose.Schema({
	action: String
});

var retroSchema = mongoose.Schema({
    title: String,
    team: String,
    description: String,
    actions: [actionsSchema]
});

var Retro = mongoose.model('Retro', retroSchema);

module.exports = Retro;