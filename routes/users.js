var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var User = require('../model/user.model');
var jwt = require('jsonwebtoken');
var env = require('./../config/env')

routes.get('/', function (req,res,next) {
    res.contentType('application/json');
    User.find({})
        .then((users) => {
            res.status(200).json(users);
        })
        .catch(next);
})

routes.get('/:id',function (req,res,next) {
    const id = req.params.id;
    User.findOne({_id: id})
        .then((user) => {
            res.status(200).json(user);
        })
        .catch(next);
})

routes.post('/', function (req,res,next) {
    const userReq = req.body;
    User.create(userReq)
        .then(user => res.send(user))
        .catch(next);
})

routes.put('/:id', function (req,res,next) {
    const id = req.params.id;
    const body = req.body;

    User.findByIdAndUpdate({_id: id},body)
        .then(() => User.findByIdAndUpdate({_id: id}))
        .then(user => res.send(user))
        .catch(next);
})

routes.post('/auth',function (req,res) {
    User.findOne({
        username: req.body.username
    },function (err,user){
        if(err)throw err;
        if(!user){
            console.log(req.body.username);
            res.status(401).json({message:'User not found'});
        } else if(user){
            if(user.password != req.body.password){
                res.status(401).json({message:'Wrong password'});
            } else {
                res.status(200).json(user);
            }
        }
    })
})

routes.delete('/:id', function (req,res,next) {
    const id = req.params.id;

    User.findByIdAndRemove({_id: id})
        .then(user => res.send(user))
        .catch(next);
})

module.exports = routes;