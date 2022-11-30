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

//User Handlers
const {
  addUser,
  addAlbum,
  getMyPicks,
  addReview,
  deletePick,
} = require("./handlers/UserHandlers");

express()
  .use(express.json())
  .use(helmet())
  .use(morgan("tiny"))

  .get("/search/:searchValue", searchAlbum)
  .get("/album/:albumId", getAlbumDetails)
  .get("/spotify", getSpotify)

  .get("/mypicks/:userId", getMyPicks)
  .post("/add-user", addUser)
  .patch("/add-album", addAlbum)
  .patch("/add-review", addReview)
  .patch("/delete-pick", deletePick)

  .listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
