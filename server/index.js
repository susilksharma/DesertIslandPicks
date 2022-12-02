const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const port = 8000;

//Music Handlers
const {
  searchAlbum,
  getAlbumDetails,
  addAlbum,
  getSpotify,
  getAlbumPicks,
} = require("./handlers/MusicHandlers");

//Movie Handlers
const {
  searchMovies,
  getMovieDetails,
  addMovie,
  getMoviePicks,
} = require("./handlers/MovieHandlers");

//Book Handlers
const {
  searchBooks,
  addBook,
  getBookDetails,
  getBookPicks,
} = require("./handlers/BookHandlers");

//User Handlers
const {
  addUser,
  getMyPicks,
  addReview,
  deletePick,
  getFeed,
} = require("./handlers/UserHandlers");

express()
  .use(express.json())
  .use(helmet())
  .use(morgan("tiny"))

  //Music
  .get("/search-albums/:searchValue", searchAlbum)
  .get("/albums/:albumId", getAlbumDetails)
  .patch("/add-album", addAlbum)
  .get("/picks/albums/:userId", getAlbumPicks)
  .get("/spotify/:searchValue", getSpotify)

  //Movie
  .get("/search-movies/:searchValue", searchMovies)
  .get("/movies/:movieId", getMovieDetails)
  .patch("/add-movie", addMovie)
  .get("/picks/movies/:userId", getMoviePicks)

  //Books
  .get("/search-books/:searchValue", searchBooks)
  .get("/books/:bookId", getBookDetails)
  .patch("/add-book", addBook)
  .get("/picks/books/:userId", getBookPicks)

  //User
  .get("/mypicks/:userId", getMyPicks)
  .get("/feed/:userId", getFeed)
  .post("/add-user", addUser)
  .patch("/add-review", addReview)
  .patch("/delete-pick", deletePick)

  .listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
