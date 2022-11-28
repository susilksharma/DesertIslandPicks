const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const port = 8000;

const {
  getRandomRelease,
  searchAlbum,
  getAlbumDetails,
  addUser,
  addAlbum,
  getMyPicks,
} = require("./handlers/handlers");

express()
  .use(express.json())
  .use(helmet())
  .use(morgan("tiny"))
  .get("/hello", (req, res) => {
    res.status(200).json({ status: 200, message: "Hello World!" });
  })

  .get("/release", getRandomRelease)
  .get("/search/:searchValue", searchAlbum)
  .get("/album/:albumId", getAlbumDetails)
  .get("/mypicks", getMyPicks)

  .post("/add-user", addUser)
  .patch("/add-album", addAlbum)

  .listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
