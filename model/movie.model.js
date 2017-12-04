const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    posterUrl: {type: String, required: true},
    length: {type: Number, required: true}
})

const Movie = mongoose.model('movie',MovieSchema);
module.exports = Movie;