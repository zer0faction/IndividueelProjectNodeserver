const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('App', () => {
    it('request to wrong api route responds with 404', (done) => {
        request(app)
            .get('/thisroutedoesntexcist')
            .end((err, res) => {
                assert(res.status === 404);
                done();
            });
    })
})