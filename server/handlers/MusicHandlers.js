require("dotenv").config();
const request = require("superagent");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
//Authorization token & package for Discogs API
const Discogs = require("disconnect").Client;
const { TOKEN } = process.env;

//Spotify Info
const { SPOTIFY_TOKEN, REFRESH_TOKEN } = process.env;

//Search Discogs API for album based on search parameters
const searchAlbum = async (req, res) => {
  const searchValue = req.params.searchValue;
  const db = new Discogs({
    userToken: TOKEN,
  }).database();

  try {
    //Look through all master recordings that contain search parameters
    const response = await db.search(searchValue, { type: "master" });
    response
      ? res.status(200).json({
          status: 200,
          data: response,
          message: "Search Results",
        })
      : res.status(404).json({
          status: 404,
          data: searchValue,
          message: "No Search Results",
        });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

//Get details for album based on it's ID
const getAlbumDetails = async (req, res) => {
  const albumId = req.params.albumId;
  const db = new Discogs({
    userToken: TOKEN,
  }).database();

  try {
    const response = await db.getMaster(albumId);
    response
      ? res.status(200).json({
          status: 200,
          data: response,
          message: "Selected Album",
        })
      : res
          .status(404)
          .json({ status: 404, data: albumId, message: "Invalid Album Id" });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

//Add album to picks if picks aren't full and album isn't already there
const addAlbum = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const albumInfo = req.body;
  try {
    const db = client.db("dipDb");

    //Find user
    const userInfo = await db
      .collection("users")
      .findOne({ userId: albumInfo.userId });

    //Check is album already picked?
    const checkAlbum = userInfo.albumPicks.find((album) => {
      return album.pickId === albumInfo.pickId;
    });

    //If album already picked send error
    if (checkAlbum !== undefined) {
      res
        .status(400)
        .json({ status: 400, data: userInfo, message: "Album already picked" });
    }
    //If picks are full (5 max), send error
    else if (userInfo.albumPicks.length > 4) {
      await db.collection("users");
      res
        .status(400)
        .json({ status: 400, data: userInfo, message: "Picks full" });
    }
    //Otherwise, add album to picks
    else if (checkAlbum === undefined) {
      await db.collection("users").updateOne(
        { userId: albumInfo.userId },
        {
          $push: {
            albumPicks: {
              ...albumInfo,
              review: "",
              isLiked: false,
              comment: "",
            },
          },
        }
      );
      await db
        .collection("allAlbumPicks")
        .insertOne({ ...albumInfo, type: "album" });

      res
        .status(200)
        .json({ status: 200, data: userInfo, message: "Album added!" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err });
  }
};

const getAlbumPicks = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userId = req.params.userId;

  await client.connect();

  try {
    const db = client.db("dipDb");
    const picks = await db.collection("users").findOne({ userId: userId });

    picks
      ? res.status(200).json({
          status: 200,
          data: picks.albumPicks,
          message: "User Album picks!",
        })
      : res.status(400).json({ status: 400, message: error });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
};

const getSpotify = async (req, res) => {
  const albumInfo = req.params.searchValue.replace(/ /g, "%20");

  try {
    const results = await request.get(
      `https://api.spotify.com/v1/search?q=${albumInfo}&type=album`
    );
    results
      ? res.status(200).json({
          status: 200,
          data: results,
          message: "Success!",
        })
      : res.status(400).json({
          status: 400,
          data: albumInfo,
          message: "Error",
        });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err });
  }
};

//Add/edit review for pick
const addAlbumReview = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const reviewInfo = req.body;
  try {
    const db = client.db("dipDb");

    const writeReview = await db
      .collection("users")
      .findOneAndUpdate(
        { userId: reviewInfo.userId, "albumPicks.pickId": reviewInfo.pickId },
        { $set: { "albumPicks.$.review": reviewInfo.review } }
      );
    writeReview
      ? res
          .status(200)
          .json({ status: 200, data: reviewInfo, message: "Review Updated!!" })
      : res.status(400).json({ status: 400, message: "Please try again" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
};

//Delete User's Pick
const deleteAlbum = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const pickToDelete = req.body;
  // console.group(pickToDelete);

  try {
    const db = client.db("dipDb");

    const deletePick = await db.collection("users").findOneAndUpdate(
      { userId: pickToDelete.userId },
      {
        $pull: {
          albumPicks: {
            pickId: pickToDelete.pickId,
          },
        },
      }
    );

    deletePick
      ? res
          .status(200)
          .json({ status: 200, data: pickToDelete, message: "Pick Deleted!" })
      : res.status(400).json({ status: 400, message: "Please Try Again" });
  } catch (error) {
    res.status(400).json({ status: 400, message: error });
  }
};

module.exports = {
  getAlbumDetails,
  searchAlbum,
  getSpotify,
  getAlbumPicks,
  addAlbum,
  addAlbumReview,
  deleteAlbum,
};
