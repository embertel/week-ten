var mongoose = require('mongoose');

var retroSchema = mongoose.Schema({
    title: String,
    team: String,
    description: String
});

var Retro = mongoose.model('Retro', retroSchema);

module.exports = Retro;