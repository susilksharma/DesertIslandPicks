const request = require("superagent");

const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { BOOK_KEY } = process.env;
const { MOVIE_KEY } = process.env;
//Authorization token & package for Discogs API
const Discogs = require("disconnect").Client;
const { TOKEN } = process.env;

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
        favAuthor: "Not selected",
        favMovie: "Not selected",
        favMusicalArtist: "Not selected",
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

    const filterFeed = await picks
      .filter((pick) => {
        return pick.userId !== userId;
      })
      .slice(0, 3);

    //WORK ON LOGIC
    // const randomNum = await Math.floor(Math.random() * filterFeed.length);

    // const randomPicks = await filterFeed.slice(randomNum, randomNum + 3);

    filterFeed
      ? res
          .status(200)
          .json({ status: 200, data: filterFeed, message: "User picks!" })
      : res.status(400).json({ status: 400, message: error });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
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
    res.status(500).json({ status: 500, message: "error" });
  }
};

const getRecommended = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const userId = req.params.userId;
  console.log(userId);

  try {
    const db = client.db("dipDb");
    const user = await db.collection("users").findOne({ userId: userId });

    //Find random book based on user's favorite author
    const bookSearch = await request.get(
      `https://www.googleapis.com/books/v1/volumes?q=${user.favAuthor}&key=${BOOK_KEY}`
    );
    const books = await JSON.parse(bookSearch.text).items;
    const bookRec = await books[Math.floor(Math.random() * books.length)];

    //Find random movie based on user's favorite movie
    const movie = await request.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_KEY}&language=en-US&query=${user.favMovie}&page=1&include_adult=false`
    );
    const movieId = await JSON.parse(movie.text).results[0].id;
    const similarMovies = await request.get(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${MOVIE_KEY}&language=en-US&page=1`
    );
    const movies = await JSON.parse(similarMovies.text).results;
    const movieRec = await movies[Math.floor(Math.random() * movies.length)];

    //Find random album based on user's favorite artist
    const discogsDb = new Discogs({
      userToken: TOKEN,
    }).database();
    const albums = await discogsDb.search(user.favMusicalArtist, {
      type: "master",
    });
    const genre = await albums.results[0].genre[0];
    const albumsRec = await discogsDb.search({
      genre: genre,
    });
    const albumRec = await albumsRec.results[
      Math.floor(Math.random() * albumsRec.results.length)
    ];

    bookRec
      ? res.status(200).json({
          status: 200,
          data: [
            {
              type: "book",
              basedOn: user.favAuthor,
              rec: bookRec,
              pickId: bookRec.id,
              image: bookRec?.volumeInfo?.imageLinks?.thumbnail,
              title: bookRec?.volumeInfo?.title,
            },
            {
              type: "movie",
              basedOn: user.favMovie,
              rec: movieRec,
              pickId: movieRec.id,
              image: `https://image.tmdb.org/t/p/original/${movieRec?.poster_path}`,
              title: movieRec?.title,
            },
            {
              type: "album",
              basedOn: user.favMusicalArtist,
              rec: albumRec,
              pickId: albumRec.id,
              image: albumRec.thumb,
              title: albumRec.title,
            },
          ],
          message: "User picks!",
        })
      : res.status(400).json({ status: 400, message: "error" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
};

const editProfile = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const profileInfo = req.body;
  try {
    const db = client.db("dipDb");

    const editProfileInfo = await db.collection("users").findOneAndUpdate(
      { userId: profileInfo.userId },
      {
        $set: {
          given_name: profileInfo.given_name,
          family_name: profileInfo.family_name,
          favAuthor: profileInfo.favAuthor,
          favMovie: profileInfo.favMovie,
          favMusicalArtist: profileInfo.favMusicalArtist,
        },
      }
    );
    profileInfo
      ? res
          .status(200)
          .json({ status: 200, data: profileInfo, message: "Profile Updated!" })
      : res.status(400).json({ status: 400, message: "Please try again" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
};

const addLike = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const pickInfo = req.body;
  try {
    const db = client.db("dipDb");

    const userInfo = await db.collection("users").findOne({
      userId: pickInfo.userId,
    });

    if (pickInfo.mediaPicked === "album") {
      const isLikedValue = userInfo.albumPicks.filter((pick) => {
        return pick.pickId === pickInfo.pickId;
      })[0].isLiked;

      const toggleValue = await db
        .collection("users")
        .findOneAndUpdate(
          { userId: pickInfo.userId, "albumPicks.pickId": pickInfo.pickId },
          { $set: { "albumPicks.$.isLiked": !isLikedValue } }
        );
    } else if (pickInfo.mediaPicked === "movie") {
      const isLikedValue = userInfo.moviePicks.filter((pick) => {
        return pick.pickId === pickInfo.pickId;
      })[0].isLiked;

      const toggleValue = await db
        .collection("users")
        .findOneAndUpdate(
          { userId: pickInfo.userId, "moviePicks.pickId": pickInfo.pickId },
          { $set: { "moviePicks.$.isLiked": !isLikedValue } }
        );
    } else {
      const isLikedValue = userInfo.bookPicks.filter((pick) => {
        return pick.pickId === pickInfo.pickId;
      })[0].isLiked;

      const toggleValue = await db
        .collection("users")
        .findOneAndUpdate(
          { userId: pickInfo.userId, "bookPicks.pickId": pickInfo.pickId },
          { $set: { "bookPicks.$.isLiked": !isLikedValue } }
        );
    }
    userInfo
      ? res.status(200).json({
          status: 200,
          data: userInfo,
          message: "Like toggled!",
        })
      : res.status(400).json({ status: 400, message: "Please try again" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
};

module.exports = {
  addUser,
  getProfile,
  getFeed,
  getPopularPicks,
  getRecommended,
  editProfile,
  addLike,
};
