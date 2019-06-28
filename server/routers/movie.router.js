const express = require('express');

// router is capitaled because it's going to make an object
// use express to create your router
const router = express.Router();

// move routes (GET/POST) from server.js into here
// Setup route to return movies
// requiring movie.module.js. location is server/modules/
const movieData = require('./modules/movie.module.js');
// get gets things
// used to be app.get, but we're setting up the router
// '/' = /movies  -/movies gets chunked off
// otherwise url would be /movies/movies
router.get('/', (req, res) => {
    res.send(movieData);
})

router.get('/first', (req, res) =>{
    res.send(movieData[0]);
})
// post adds things
// used to be app.post, but we're setting up the router
// '/' = /movies  -/movies gets chunked off
// otherwise url would be /movies/movies
router.post('/', (req, res) => {
    // Get the movie from the request
    let newMovie = req.body;
    console.log('We are adding the movie', newMovie);
    // Add it onto the array of movies
    movieData.push(newMovie);
    // A good server always responds - 201 means Created! (added movie)
    res.sendStatus(201);
})


module.exports = router;