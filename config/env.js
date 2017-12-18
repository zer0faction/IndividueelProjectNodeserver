var env = {
    webPort: process.env.PORT || 4200,
    dbHost: process.env.DB_HOST || 'ds135186.mlab.com',
    dbPort: process.env.DB_PORT || '35186',
    dbUser: process.env.DB_USER || 'erin',
    dbPassword: process.env.DB_PASSWORD || 'test',
    dbDatabase: process.env.DB_DATABASE || 'movies'
}

var dburl = 'mongodb://' + env.dbUser + ':' + env.dbPassword + '@' + env.dbHost + ':' + env.dbPort + '/' + env.dbDatabase;

    // process.env.NODE_ENV === 'production' ?
    // 'mongodb://' + env.dbUser + ':' + env.dbPassword + '@' + env.dbHost + ':' + env.dbPort + '/' + env.dbDatabase :
    // 'mongodb://localhost/' + env.dbDatabase

module.exports = {
    env: env,
    dburl: dburl,
    'secret':'geheimpie'
};

//mongodb://<dbuser>:<dbpassword>@ds135186.mlab.com:35186/movies