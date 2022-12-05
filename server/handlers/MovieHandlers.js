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
      `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_KEY}&language=en-US&query=${searchValue}&page=1&include_adult=false`
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

const searchMoviesByGenre = async (req, res) => {
  const genreId = req.params.genreId;

  try {
    const results = await request.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_KEY}&with_genres=${genreId}`
    );

    results
      ? res.status(200).json({
          status: 200,
          data: JSON.parse(results.text),
          message: "Success!",
        })
      : res.status(400).json({ status: 400, data: genreId, message: "Error" });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error });
  }
};

const searchMoviesByDirector = async (req, res) => {
  const directorId = req.params.directorId;

  try {
    const results = await request.get(
      `https://api.themoviedb.org/3/person/${directorId}/movie_credits?api_key=${MOVIE_KEY}`
    );

    results
      ? res.status(200).json({
          status: 200,
          data: JSON.parse(results.text),
          message: "Success!",
        })
      : res.status(400).json({
          status: 400,
          data: directorId,
          message: "Error",
        });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error });
  }
};

const getMovieDetails = async (req, res) => {
  const movieId = req.params.movieId;
  try {
    const movie = await request.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${MOVIE_KEY}&language=en-US`
    );

    const details = await JSON.parse(movie.text);

    const castCrew = await request.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${MOVIE_KEY}`
    );

    const director = await JSON.parse(castCrew.text).crew.filter(
      ({ job }) => job === "Director"
    );

    const cast = await JSON.parse(castCrew.text)
      .cast.map((cast) => {
        return cast.name;
      })
      .slice(0, 6);

    const streaming = await request.get(
      `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${MOVIE_KEY}`
    );

    const streamingLink = JSON.parse(streaming.text).results.CA;

    details && director && cast && streamingLink
      ? res.status(200).json({
          status: 200,
          data: { details, cast, director, streamingLink },
          message: "Success!",
        })
      : res.status(400).json({ status: 400, data: movieId, message: "Error" });
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

    //Check is movie already picked
    const checkMovie = userInfo.moviePicks.find((movie) => {
      return movie.pickId === movieInfo.pickId;
    });

    //If movie already picked send error
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
              isLiked: false,
              comment: "",
            },
          },
        }
      );
      const addMovie = await db
        .collection("allMoviePicks")
        .insertOne({ ...movieInfo, type: "movie" });

      //Add to Recent Activity
      await db.collection("recentActivity").insertOne({
        activity: "picked",
        userId: movieInfo.userId,
        userName: movieInfo.userName,
        pickId: movieInfo.pickId,
        title: `the album ${movieInfo.title}`,
        time: Date.now(),
      });

      addMovie
        ? res
            .status(200)
            .json({ status: 200, data: userInfo, message: "Movie added!" })
        : res.status(400).json({ status: 400, message: "Error adding Movie!" });
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

//Add/edit review for pick
const addMovieReview = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const reviewInfo = req.body;
  try {
    const db = client.db("dipDb");

    const writeReview = await db
      .collection("users")
      .findOneAndUpdate(
        { userId: reviewInfo.userId, "moviePicks.pickId": reviewInfo.pickId },
        { $set: { "moviePicks.$.review": reviewInfo.review } }
      );

    //Add to Recent Activity
    await db.collection("recentActivity").insertOne({
      activity: "reviewed",
      userId: reviewInfo.userId,
      userName: reviewInfo.userName,
      pickId: reviewInfo.pickId,
      title: `the album ${reviewInfo.title}`,
      time: Date.now(),
    });

    writeReview
      ? res
          .status(200)
          .json({ status: 200, data: reviewInfo, message: "Review Updated!!" })
      : res.status(400).json({ status: 400, message: "Please try again" });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error });
  }
};

//Delete User's Pick
const deleteMovie = async (req, res) => {
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
          moviePicks: {
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
  searchMoviesByGenre,
  searchMoviesByDirector,
  searchMovies,
  getMovieDetails,
  addMovie,
  getMoviePicks,
  addMovieReview,
  deleteMovie,
};
