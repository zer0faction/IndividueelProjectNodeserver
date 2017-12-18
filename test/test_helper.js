const mongoose = require('mongoose');

before(done => {
    mongoose.connect('mongodb://localhost/movies_test');
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.log(err);
        })
})

beforeEach(done => {
    const { movies } = mongoose.connection.collections;
    const { users } = mongoose.connection.collections;
    users.drop()
    movies.drop()
        .then(()=>done())
        .catch(()=>done());
;
})