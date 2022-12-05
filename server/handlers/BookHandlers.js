const request = require("superagent");

//MongoDB variables
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { BOOK_KEY } = process.env;

//Search for Books
const searchBooks = async (req, res) => {
  const searchValue = req.params.searchValue;

  try {
    const results = await request.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&key=${BOOK_KEY}`
    );

    //Filter out results that don't contain images
    const resultsArr = JSON.parse(results.text).items.filter((book) => {
      return book.volumeInfo.imageLinks;
    });

    results
      ? res.status(200).json({
          status: 200,
          data: resultsArr,
          message: "Success!",
        })
      : res
          .status(400)
          .json({ status: 400, data: searchValue, message: "Error" });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error });
  }
};

//Get Detailed Book Info by Book Id
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

//Add Book Pick to DB
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
    //Otherwise, add book to user picks and all picks
    else if (checkBook === undefined) {
      await db.collection("users").updateOne(
        { userId: bookInfo.userId },
        {
          $push: {
            bookPicks: {
              ...bookInfo,
              review: "",
              isLiked: false,
              comment: "",
            },
          },
        }
      );
      const addBook = await db
        .collection("allBookPicks")
        .insertOne({ ...bookInfo, type: "book" });

      //Add to Recent Activity
      await db.collection("recentActivity").insertOne({
        activity: "picked",
        userId: bookInfo.userId,
        userName: bookInfo.userName,
        pickId: bookInfo.pickId,
        title: `the album ${bookInfo.title}`,
        time: Date.now(),
      });

      addBook
        ? res
            .status(200)
            .json({ status: 200, data: userInfo, message: "Book added!" })
        : res.status(400).json({ status: 400, message: "Error adding book!" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err });
  }
};

//Retrieve picked Books by User ID
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

//Add/edit review for pick
const addBookReview = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const reviewInfo = req.body;
  try {
    const db = client.db("dipDb");

    const writeReview = await db
      .collection("users")
      .findOneAndUpdate(
        { userId: reviewInfo.userId, "bookPicks.pickId": reviewInfo.pickId },
        { $set: { "bookPicks.$.review": reviewInfo.review } }
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
    return res.status(500).json({ status: 500, message: error });
  }
};

//Delete User's Pick
const deleteBook = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const pickToDelete = req.body;

  try {
    const db = client.db("dipDb");

    const deletePick = await db.collection("users").findOneAndUpdate(
      { userId: pickToDelete.userId },
      {
        $pull: {
          bookPicks: {
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
  searchBooks,
  getBookDetails,
  addBook,
  getBookPicks,
  addBookReview,
  deleteBook,
};
