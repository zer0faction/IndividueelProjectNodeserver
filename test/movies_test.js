const assert = require('assert');
const request = require('supertest');
const app = require('../app')
const Movie = require('../model/movie.model');

describe('Movies tests', function() {
    this.timeout(10000);

    it('Get a single movie',(done) => {
        const movie = new Movie({
            title: "Wall-E",
            description: "In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.",
            posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjExMTg5OTU0NF5BMl5BanBnXkFtZTcwMjMxMzMzMw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
            rating: "AL",
            releaseDate: "30 July 2008",
            length: 120,
            genres: [
                {
                    "genre": "Animation",
                    "_id": "5a357e9a2187370014194279"
                },
                {
                    "genre": "Comedy",
                    "_id": "5a357e9a2187370014194278"
                },
                {
                    "genre": "Family",
                    "_id": "5a357e9a2187370014194277"
                },
                {
                    "genre": "Drama",
                    "_id": "5a357e9a2187370014194276"
                },
                {
                    "genre": "Horror",
                    "_id": "5a357e9a2187370014194275"
                }
            ],
            writers: [
                {
                    "name": "Andrew Stanton",
                    "_id": "5a357e9a218737001419427a"
                }
            ],
            directors: [
                {
                    "name": "Andrew Stanton",
                    "_id": "5a357e9a218737001419427b"
                }
            ]
        });

        movie.save().then(() => {
            request(app)
                .get('/movies/${movie._id}')
                .end(() => {
                    Movie.findOne({title: 'Wall-E'})
                        .then(res => {
                            assert(res.length === 120);
                            console.log(res.body);
                            done();
                        })
                })
        })
    })

    it('Post a new movie', (done) => {
        Movie.count().then(count => {
            request(app)
                .post('/movies/')
                .send({
                    title: "Wall-E",
                    description: "In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.",
                    posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjExMTg5OTU0NF5BMl5BanBnXkFtZTcwMjMxMzMzMw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
                    rating: "AL",
                    releaseDate: "30 July 2008",
                    length: 120,
                    genres: [
                        {
                            "genre": "Animation",
                            "_id": "5a357e9a2187370014194279"
                        },
                        {
                            "genre": "Comedy",
                            "_id": "5a357e9a2187370014194278"
                        },
                        {
                            "genre": "Family",
                            "_id": "5a357e9a2187370014194277"
                        },
                        {
                            "genre": "Drama",
                            "_id": "5a357e9a2187370014194276"
                        },
                        {
                            "genre": "Horror",
                            "_id": "5a357e9a2187370014194275"
                        }
                    ],
                    writers: [
                        {
                            "name": "Andrew Stanton",
                            "_id": "5a357e9a218737001419427a"
                        }
                    ],
                    directors: [
                        {
                            "name": "Andrew Stanton",
                            "_id": "5a357e9a218737001419427b"
                        }
                    ]
                })
                .end(() => {
                    Movie.count().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    });
                });
        });
    });

    it('Make sure a movie post is valid',(done) => {
        request(app)
            .post('/movies/')
            .send({})
            .end((err,res) => {
                assert(res.status !== 200);
                done();
            });
    });


    it('Update a movie',(done) => {
        const movie = new Movie({
            title: "Wall-E",
            description: "In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.",
            posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjExMTg5OTU0NF5BMl5BanBnXkFtZTcwMjMxMzMzMw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
            rating: "AL",
            releaseDate: "30 July 2008",
            length: 120,
            genres: [
                {
                    "genre": "Animation",
                    "_id": "5a357e9a2187370014194279"
                },
                {
                    "genre": "Comedy",
                    "_id": "5a357e9a2187370014194278"
                },
                {
                    "genre": "Family",
                    "_id": "5a357e9a2187370014194277"
                },
                {
                    "genre": "Drama",
                    "_id": "5a357e9a2187370014194276"
                },
                {
                    "genre": "Horror",
                    "_id": "5a357e9a2187370014194275"
                }
            ],
            writers: [
                {
                    "name": "Andrew Stanton",
                    "_id": "5a357e9a218737001419427a"
                }
            ],
            directors: [
                {
                    "name": "Andrew Stanton",
                    "_id": "5a357e9a218737001419427b"
                }
            ]
        });

        movie.save().then(() => {
            request(app)
                .put('/movies/${movie._id}')
                .send({
                    "title": "Wall-E",
                    description: "In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.",
                    posterUrl: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjExMTg5OTU0NF5BMl5BanBnXkFtZTcwMjMxMzMzMw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
                    rating: "AL",
                    releaseDate: "30 July 2008",
                    length: 120,
                    genres: [
                        {
                            "genre": "Animation"
                        },
                        {
                            "genre": "Comedy"
                        },
                        {
                            "genre": "Family"
                        },
                        {
                            "genre": "Drama"
                        },
                        {
                            "genre": "Horror"
                        }
                    ],
                    writers: [
                        {
                            "name": "Andrew Stanton"
                        }
                    ],
                    directors: [
                        {
                            "name": "Andrew Stanton"
                        }
                    ]
                })
                .end((err, res) => {
                    assert(res.status === 200);
                    console.log(res.body);
                    // console.log(res.text()+'text');
                    // console.log(res.json()+'json');
                    done();
                });
        });
    });
});