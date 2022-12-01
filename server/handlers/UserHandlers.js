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

    const checkEmail = await db
      .collection("users")
      .findOne({ email: user.email });

    if (checkEmail) {
      res.status(400).json({
        status: 400,
        data: { ...user, userId: userId },
        message: "User already exists",
      });
    } else {
      res.status(200).json({
        status: 200,
        data: { ...user, userId: userId },
        message: "User created",
      });
      await db.collection("users").insertOne({
        ...user,
        userId: userId,
        //PICKS START AT 5???
        albumPicks: [
          // { pick: 1 },
          // { pick: 2 },
          // { pick: 3 },
          // { pick: 4 },
          // { pick: 5 },
        ],
      });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

//Add album to picks if picks aren't full and album isn't already there
const addAlbum = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const albumInfo = req.body;
  console.log(albumInfo);
  try {
    const db = client.db("dipDb");

    //Find user
    const userInfo = await db
      .collection("users")
      .findOne({ userId: albumInfo.userId });

    //Check is album already picked?
    const checkAlbum = userInfo.picks.find((pick) => {
      return pick.albumId === albumInfo.albumId;
    });

    //If album already picked send error
    if (checkAlbum !== undefined) {
      res
        .status(400)
        .json({ status: 400, data: userInfo, message: "Album already picked" });
    }
    //If picks are full (5 max), send error
    else if (userInfo.picks.length > 4) {
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
            picks: {
              ...albumInfo,
              review: "",
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

//Get current user's picks, based on userId
const getMyPicks = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userId = req.params.userId;

  await client.connect();

  try {
    const db = client.db("dipDb");
    const picks = await db.collection("users").findOne({ userId: userId });

    picks
      ? res
          .status(200)
          .json({ status: 200, data: picks.picks, message: "User picks!" })
      : res.status(400).json({ status: 400, message: error });
  } catch (error) {
    res.status(400).json({ status: 400, message: error });
  }
};

//Add/edit review for pick
const addReview = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const reviewInfo = req.body;
  try {
    const db = client.db("dipDb");

    await db
      .collection("users")
      .findOneAndUpdate(
        { userId: reviewInfo.userId, "picks.albumId": reviewInfo.albumId },
        { $set: { "picks.$.review": reviewInfo.review } }
      );

    res
      .status(200)
      .json({ status: 200, data: reviewInfo, message: "Success!" });
  } catch (error) {
    res.status(400).json({ status: 400, message: error });
  }
};

//Delete User's Pick
const deletePick = async (req, res) => {
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
          picks: {
            albumId: pickToDelete.albumId,
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
      return feed.picks;
    });

    picks
      ? res
          .status(200)
          .json({ status: 200, data: picksArray, message: "User picks!" })
      : res.status(400).json({ status: 400, message: error });
  } catch (error) {
    res.status(400).json({ status: 400, message: error });
  }
};

module.exports = {
  addUser,
  addAlbum,
  getMyPicks,
  addReview,
  deletePick,
  getFeed,
};
