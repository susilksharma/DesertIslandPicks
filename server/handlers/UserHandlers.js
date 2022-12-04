const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Package to generate user ID
const { v4: uuidv4 } = require("uuid");

//Add User to DB if they aren't already there
const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userId = uuidv4();

  await client.connect();

  const user = req.body;

  try {
    const db = client.db("dipDb");

    //Check if user email already exists
    const checkEmail = await db
      .collection("users")
      .findOne({ email: user.email });

    //If user email already exists, send error
    if (checkEmail) {
      res.status(400).json({
        status: 400,
        data: { ...user, userId: userId },
        message: "User already exists",
      });
      //If user email doesn't exist, create user and send info
    } else {
      res.status(200).json({
        status: 200,
        data: { ...user, userId: userId },
        message: "User created",
      });
      await db.collection("users").insertOne({
        ...user,
        userId: userId,
        albumPicks: [],
        moviePicks: [],
        bookPicks: [],
      });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

//Get current user's picks, based on userId
const getProfile = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userId = req.params.userId;

  await client.connect();

  try {
    const db = client.db("dipDb");
    const picks = await db.collection("users").findOne({ userId: userId });

    picks
      ? res.status(200).json({
          status: 200,
          data: picks,
          message: "User Info!",
        })
      : res.status(400).json({ status: 400, message: error });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
};

const getFeed = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userId = req.params.userId;

  await client.connect();

  try {
    const db = client.db("dipDb");
    const picks = await db.collection("users").find().toArray();

    const filterFeed = await picks.filter((pick) => {
      return pick.userId !== userId;
    });

    const picksArray = await filterFeed.map((feed) => {
      return feed.albumPicks;
    });

    picks
      ? res
          .status(200)
          .json({ status: 200, data: filterFeed, message: "User picks!" })
      : res.status(400).json({ status: 400, message: error });
  } catch (error) {
    res.status(400).json({ status: 400, message: error });
  }
};

const getPopularPicks = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const userId = req.params.userId;

  try {
    const db = client.db("dipDb");

    //Find random User picked Album
    const albumPicks = await db.collection("allAlbumPicks").find().toArray();

    const filteredAlbums = await albumPicks.filter((pick) => {
      return pick.userId !== userId;
    });

    const randomAlbum = await filteredAlbums[
      Math.floor(Math.random() * filteredAlbums.length)
    ];

    //Find random User picked Movie
    const moviePicks = await db.collection("allMoviePicks").find().toArray();

    const filteredMovies = await moviePicks.filter((pick) => {
      return pick.userId !== userId;
    });

    const randomMovie = await filteredMovies[
      Math.floor(Math.random() * filteredMovies.length)
    ];

    //Find random User picked Movie
    const bookPicks = await db.collection("allBookPicks").find().toArray();

    const filteredBooks = await bookPicks.filter((pick) => {
      return pick.userId !== userId;
    });

    const randomBook = await filteredBooks[
      Math.floor(Math.random() * filteredBooks.length)
    ];

    randomAlbum && randomMovie && randomBook
      ? res.status(200).json({
          status: 200,
          data: [randomAlbum, randomMovie, randomBook],
          message: "User Info!",
        })
      : res.status(400).json({ status: 400, message: error });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
};

module.exports = {
  addUser,
  getProfile,
  getFeed,
  getPopularPicks,
};
