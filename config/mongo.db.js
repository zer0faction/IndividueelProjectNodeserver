const mongoose = require('mongoose');
const config = require('./env');

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(config.dburl);
}

var connection = mongoose.connection
    .once('open', () => console.log('Connected to Mongo on ' + config.dburl))
    .on('error', (error) => {
        console.warn('Warning', error.toString());
    });

module.exports = connection;