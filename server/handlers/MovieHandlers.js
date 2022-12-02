const request = require("superagent");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { MOVIE_KEY } = process.env;

const searchMovies = async (req, res) => {
  const searchValue = req.params.searchValue;

  try {
    const results = await request.get(
      `http://www.omdbapi.com/?s=${searchValue}&plot=short&apikey=${MOVIE_KEY}`
    );

    results
      ? res.status(200).json({
          status: 200,
          data: JSON.parse(results.text),
          message: "Success!",
        })
      : res
          .status(400)
          .json({ status: 400, data: searchValue, message: "Error" });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error });
  }
};

const getMovieDetails = async (req, res) => {
  const movieId = req.params.movieId;
  try {
    const results = await request.get(
      `http://www.omdbapi.com/?i=${movieId}&plot=full&apikey=${MOVIE_KEY}`
    );

    results
      ? res.status(200).json({
          status: 200,
          data: JSON.parse(results.text),
          message: "Success!",
        })
      : res.status(400).json({ status: 400, data: bookId, message: "Error" });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error });
  }
};

const addMovie = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const movieInfo = req.body;
  try {
    const db = client.db("dipDb");

    //Find user
    const userInfo = await db
      .collection("users")
      .findOne({ userId: movieInfo.userId });

    //Check is book already picked
    const checkMovie = userInfo.moviePicks.find((movie) => {
      return movie.pickId === movieInfo.pickId;
    });

    //If book already picked send error
    if (checkMovie !== undefined) {
      res
        .status(400)
        .json({ status: 400, data: userInfo, message: "Movie already picked" });
    }
    //If picks are full (5 max), send error
    else if (userInfo.moviePicks.length > 4) {
      await db.collection("users");
      res
        .status(400)
        .json({ status: 400, data: userInfo, message: "Picks full" });
    }
    //Otherwise, add book to picks
    else if (checkMovie === undefined) {
      await db.collection("users").updateOne(
        { userId: movieInfo.userId },
        {
          $push: {
            moviePicks: {
              ...movieInfo,
              review: "",
            },
          },
        }
      );
      res
        .status(200)
        .json({ status: 200, data: userInfo, message: "Movie added!" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err });
  }
};
const getMoviePicks = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userId = req.params.userId;

  await client.connect();

  try {
    const db = client.db("dipDb");
    const picks = await db.collection("users").findOne({ userId: userId });

    picks
      ? res.status(200).json({
          status: 200,
          data: picks.moviePicks,
          message: "User Movie picks!",
        })
      : res.status(400).json({ status: 400, message: error });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
};

module.exports = {
  searchMovies,
  getMovieDetails,
  addMovie,
  getMoviePicks,
};
