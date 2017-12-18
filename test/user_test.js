const assert = require('assert');
const request = require('supertest');
const app = require('../app')
const User = require('../model/user.model');

describe('Creating a USER',() => {
    it('saves a user',()=> {
        User.count().then(count => {
            request(app)
                .post('/users/')
                .send({
                    username: 'henkie',
                    password: 'wachtwoord'
                })
                .end(() => {
                    User.count().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    });
                });
        });
    });

    it('route is not valid when body is not valid', (done) => {
        request(app)
            .post('/users/')
            .send({})
            .end((err, res) => {
                assert(res.status !== 200);
                done();
            });
    });
});