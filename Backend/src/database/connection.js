const moongose = require('mongoose');

moongose.connect('mongodb://localhost:3000/node');

mongoose.Promisse = global.Promisse;

module.exports = mongoose;