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
  addAlbumReview,
  deleteAlbum,
} = require("./handlers/MusicHandlers");

//Movie Handlers
const {
  searchMovies,
  getMovieDetails,
  addMovie,
  getMoviePicks,
  addMovieReview,
  searchMoviesByGenre,
  searchMoviesByDirector,
  deleteMovie,
} = require("./handlers/MovieHandlers");

//Book Handlers
const {
  searchBooks,
  addBook,
  getBookDetails,
  getBookPicks,
  addBookReview,
  deleteBook,
} = require("./handlers/BookHandlers");

//User Handlers
const {
  addUser,
  getProfile,
  getFeed,
  getPopularPicks,
  getRecommended,
  editProfile,
  addLike,
} = require("./handlers/UserHandlers");

express()
  .use(express.json())
  .use(helmet())
  .use(morgan("tiny"))

  //Music
  .get("/search-album/:searchValue", searchAlbum)
  .get("/album/:albumId", getAlbumDetails)
  .patch("/add-album", addAlbum)
  .patch("/album-review", addAlbumReview)
  .patch("/delete-album", deleteAlbum)
  .get("/picks/album/:userId", getAlbumPicks)
  .get("/spotify/:searchValue", getSpotify)

  //Movie
  .get("/search-movie/:searchValue", searchMovies)
  .get("/search-movie-genre/:genreId", searchMoviesByGenre)
  .get("/search-movie-director/:directorId", searchMoviesByDirector)
  .get("/movie/:movieId", getMovieDetails)
  .patch("/add-movie", addMovie)
  .patch("/delete-movie", deleteMovie)
  .patch("/movie-review", addMovieReview)
  .get("/picks/movie/:userId", getMoviePicks)

  //Books
  .get("/search-book/:searchValue", searchBooks)
  .get("/book/:bookId", getBookDetails)
  .patch("/add-book", addBook)
  .patch("/delete-book", deleteBook)
  .patch("/book-review", addBookReview)
  .get("/picks/book/:userId", getBookPicks)

  //User
  .get("/profile/:userId", getProfile)
  .get("/feed/:userId", getFeed)
  .get("/picks-popular/:userId", getPopularPicks)
  .get("/recommended/:userId", getRecommended)
  .post("/add-user", addUser)
  .patch("/profile-edit", editProfile)
  .patch("/add-like", addLike)

  .listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
