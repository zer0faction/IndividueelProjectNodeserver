var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Movie = require('../model/movie.model');

routes.get('/', function (req,res,next) {
    res.contentType('application/json');
    Movie.find({})
        .then((movies) => {
            res.status(200).json(movies);
        })
        .catch(next);
})

routes.get('/:id',function (req,res,next) {
    const id = req.params.id;
    Movie.findOne({_id: id})
        .then((movie) => {
            res.status(200).json(movie);
        })
        .catch(next);
})

routes.post('/', function (req,res,next) {
    const movieReq = req.body;
    Movie.create(movieReq)
        .then(movie => res.send(movie))
        .catch(next);
})

routes.put('/:id', function (req,res,next) {
    const id = req.params.id;
    const body = req.body;

    Movie.findByIdAndUpdate({_id: id},body)
        .then(() => Movie.findByIdAndUpdate({_id: id}))
        .then(movie => res.send(movie))
        .catch(next);
})

routes.delete('/:id', function (req,res,next) {
    const id = req.params.id;

    Movie.findByIdAndRemove({_id: id})
        .then(movie => res.send(movie))
        .catch(next);
})

module.exports = routes;