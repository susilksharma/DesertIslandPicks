require("dotenv").config();
//Authorization token & package for Discogs API
const Discogs = require("disconnect").Client;
const { TOKEN } = process.env;

//Spotify Info
const { SPOTIFY_TOKEN } = process.env;

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

const getSpotify = async (req, res) => {
  const albumInfo = req.body;
  console.log(albumInfo);
};

module.exports = {
  getAlbumDetails,
  searchAlbum,
  getSpotify,
};
