const Discogs = require("disconnect").Client;

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const searchAlbum = async (req, res) => {
  const searchValue = req.params.searchValue;
  const db = new Discogs({
    userToken: "oyaFRPoxMTzLFVmoqMQOzbmvHNWeDoFzgItISPcw",
  }).database();

  try {
    const response = await db.search(searchValue, { type: "master" });
    response
      ? res.status(200).json({
          status: 200,
          data: response,
          message: "Search Results",
        })
      : res
          .status(404)
          .json({ status: 404, data: searchValue, message: "Invalid Search" });
  } catch (err) {
    return err;
  }
};

const getAlbumDetails = async (req, res) => {
  const albumId = req.params.albumId;
  const db = new Discogs({
    userToken: "oyaFRPoxMTzLFVmoqMQOzbmvHNWeDoFzgItISPcw",
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
    return err;
  }
};

const getRandomRelease = async () => {};

const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const user = req.body;

  try {
    const db = client.db("dipDb");

    const checkEmail = await db
      .collection("users")
      .findOne({ email: user.email });

    checkEmail
      ? res.status(400).json({
          status: 400,
          data: user,
          message: "User already exists",
        })
      : await db
          .collection("users")
          .insertOne({ ...user, albumsComplete: false, picks: [] });
    res.status(200).json({ status: 200, data: user, message: "User created" });
  } catch (err) {
    return err;
  }
};

//CHECK LOGIC FOR If album already there
const addAlbum = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const albumInfo = req.body;
  try {
    const db = client.db("dipDb");

    //check if album exists and then insert album
    const userInfo = await db
      .collection("users")
      .findOne({ email: albumInfo.email });

    //is album already picked?
    const checkAlbum = userInfo.picks.find((pick) => {
      return pick.id === albumInfo.id;
    });
    console.log(checkAlbum);

    //check if picks are complete
    if (userInfo.picks.length > 4) {
      await db
        .collection("users")
        .updateOne(
          { email: albumInfo.email },
          { $set: { albumsComplete: true } }
        );
      res
        .status(400)
        .json({ status: 400, data: userInfo, message: "Picks full" });
    }
    //check if album already exists
    else if (checkAlbum !== undefined) {
      res
        .status(400)
        .json({ status: 400, data: userInfo, message: "Album already picked" });
    }
    //add album to picks
    else if (checkAlbum === undefined) {
      await db.collection("users").updateOne(
        { email: albumInfo.email },
        {
          $push: {
            picks: {
              id: albumInfo.id,
              title: albumInfo.title,
              artist: albumInfo.artist,
              image: albumInfo.image,
            },
          },
        }
      );
      res
        .status(200)
        .json({ status: 200, data: userInfo, message: "Album added!" });
    }
  } catch (err) {
    return err;
  }
};

const getMyPicks = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  try {
    const db = client.db("dipDb");
    const picks = await db.collection("users").find().toArray();

    picks
      ? res
          .status(200)
          .json({ status: 200, data: picks, message: "User picks!" })
      : res.status(400).json({ status: 400, message: error });
  } catch (error) {
    res.status(400).json({ status: 400, message: error });
  }
};

module.exports = {
  getAlbumDetails,
  getRandomRelease,
  searchAlbum,
  addUser,
  addAlbum,
  getMyPicks,
};

// try {
//   const response = await request({
//     uri: `https://api.discogs.com/database/search?q=${searchValue}&type=master&token=oyaFRPoxMTzLFVmoqMQOzbmvHNWeDoFzgItISPcw`,
//     headers: { Accept: "application/json" },
//   });
//   const searchResult = await response.toArray();
//   searchResult
//     ? res.status(200).json({
//         status: 200,
//         data: searchResult,
//         message: "search results",
//       })
//     : res
//         .status(404)
//         .json({ status: 404, data: searchValue, message: "invalid search" });
// } catch (err) {
//   return err;
// }
// };
