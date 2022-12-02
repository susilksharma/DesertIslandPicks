const request = require("superagent");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { BOOK_KEY } = process.env;

const searchBooks = async (req, res) => {
  const searchValue = req.params.searchValue;

  try {
    const results = await request.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&key=${BOOK_KEY}`
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

const getBookDetails = async (req, res) => {
  const bookId = req.params.bookId;
  try {
    const results = await request.get(
      `https://www.googleapis.com/books/v1/volumes?q=${bookId}&key=${BOOK_KEY}`
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

const addBook = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const bookInfo = req.body;
  try {
    const db = client.db("dipDb");

    //Find user
    const userInfo = await db
      .collection("users")
      .findOne({ userId: bookInfo.userId });

    //Check is book already picked
    const checkBook = userInfo.bookPicks.find((book) => {
      return book.pickId === bookInfo.pickId;
    });

    //If book already picked send error
    if (checkBook !== undefined) {
      res
        .status(400)
        .json({ status: 400, data: userInfo, message: "Book already picked" });
    }
    //If picks are full (5 max), send error
    else if (userInfo.bookPicks.length > 4) {
      await db.collection("users");
      res
        .status(400)
        .json({ status: 400, data: userInfo, message: "Picks full" });
    }
    //Otherwise, add book to picks
    else if (checkBook === undefined) {
      await db.collection("users").updateOne(
        { userId: bookInfo.userId },
        {
          $push: {
            bookPicks: {
              ...bookInfo,
              review: "",
            },
          },
        }
      );
      res
        .status(200)
        .json({ status: 200, data: userInfo, message: "Book added!" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err });
  }
};

const getBookPicks = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userId = req.params.userId;

  await client.connect();

  try {
    const db = client.db("dipDb");
    const picks = await db.collection("users").findOne({ userId: userId });

    picks
      ? res.status(200).json({
          status: 200,
          data: picks.bookPicks,
          message: "User Book picks!",
        })
      : res.status(400).json({ status: 400, message: error });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  }
};

module.exports = {
  searchBooks,
  getBookDetails,
  addBook,
  getBookPicks,
};
