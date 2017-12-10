const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    posterUrl: {type: String, required: true},
    length: {type: Number, required: true},
    directors: {type: [{
        name: {type: String, required: true}
    }],required:true},
    writers: {type: [{
        name: {type: String, required: true}
    }],required:true},
    genres: {type: [{
        genre: {type: String, required: true}
    }],required:true},
    releaseDate: {type: String, required: true},
    rating: {type: String, required: true}

})

const Movie = mongoose.model('movie',MovieSchema);
module.exports = Movie;