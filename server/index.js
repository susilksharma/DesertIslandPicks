const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const port = 8000;

//Music Handlers
const {
  searchAlbum,
  getAlbumDetails,
  getSpotify,
} = require("./handlers/MusicHandlers");

//Movie Handlers
const { searchMovies } = require("./handlers/MovieHandlers");

//User Handlers
const {
  addUser,
  addAlbum,
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
  .get("/search/:searchValue", searchAlbum)
  .get("/album/:albumId", getAlbumDetails)
  .get("/spotify/:searchValue", getSpotify)

  //Movie
  .get("search-movie/:searchValue", searchMovies)

  //User
  .get("/mypicks/:userId", getMyPicks)
  .get("/feed/:userId", getFeed)
  .post("/add-user", addUser)
  .patch("/add-album", addAlbum)
  .patch("/add-review", addReview)
  .patch("/delete-pick", deletePick)

  .listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
