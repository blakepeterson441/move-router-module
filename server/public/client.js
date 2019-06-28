console.log('Hello Playfair');

$(document).ready(onReady);

// ties back to server.js
function onReady(){

    getAllMovies();
    $('#add-movie').on('click', handleAddMovie);
}

// event is the parameter of the function
function handleAddMovie(event){
    console.log('in handleAddMovie');
    // when you're handling a click within a form
    // forms are in HTML
    event.preventDefault();

    // Get info from input fields
    let name = $('#in-name').val();
    let movie = $('#in-movie').val();

    $.ajax({
        method: 'POST',
        url: '/movies',
        // send data as an object so we can send 2 things instead of 1
        // req and res (request and response) can only do 1 item at a time
        // aka object can send numerous
        data: {
            name: name,
            movie: movie
        }
    })
    // when everything is correct
    .then( function (response){
        // POST (add movie) was good
        // Clear out input fields on form

        //GET all my movies again, so the new one shows on the page
        getAllMovies();
    })
    // when errors are happening
    .catch( function (error){
        console.log('something bad happen...');
        
    })

}

// This will add all of our movies to the DOM
function renderMovies(movieList) {
    $('#movies').empty();
    for (let item of movieList ) {
        $('#movies').append(`
        <tr>
            <td>${item.name}</td>
            <td>${item.movie}</td>
        </tr>
    `);
    }

}

function getAllMovies() {
    // gets the object (due to {}) from the movies tab via server.js
    // ajax is asynchronous $.ajax returns a Promise 
    // That Promise says that when the server responds,
    // we call the function in the then
    $.ajax({
        method: 'GET',
        url: '/movies'
        // puts the object from movie.module.js on the console.
        // then makes in run after everything else within the function
        // then and catch -- method chaining
        // . before then&catch for calling previous function/method
    })
    .then(function (response) {
        console.log(`Got some movies!!!`, response);
        renderMovies(response);
    })
    // if there's an error, this will show in the console
    .catch(function (error) {
        console.log(`Something bad happen...`);
    })
    // will log before .then || .catch ^^
    // we don't wait for the server to respond before moving on
    // ro tun this next line of code, we just do the requesting
}