const express = require("express");
const { MovieModel, validateMovie } = require("../models/movieModel");
const router = express.Router();
const auth = require("../middleware/auth");

//----GET ALL----//
router.get("/", async (req, res) => {
  let sortBy = req.query.sort ? req.query.sort : "release_date";
  let data = await MovieModel.find({}).sort({ [sortBy]: -1 });
  res.json(data);
});

//----ADD MOVIE----//
router.post("/", auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let movie = new MovieModel(req.body);
    movie.user_id = req.user._id;
    await movie.save();
    res.send(movie);
  } catch (err) {
    res.status(400).json(err);
  }
});

  movies = await movie.save();
  res.send(movies);
});

//---GET USER MOVIE---//
router.get("/user-movie", auth, async (req, res) => {
  const movie = await MovieModel.find({ user_id: req.user._id });
  res.send(movie);
});

//---SEARCH----//
router.get("/search", async (req, res) => {
  let searchQ = req.query.q;
  let expSearchQ = new RegExp(searchQ, "i");
  try {
    let data = await MovieModel.find({ title: expSearchQ });
    res.json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

//---MOVIE INFO BY ID----//
router.get("/:id", async (req, res) => {
  try {
    let data = await MovieModel.findOne({ _id: req.params.id });
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

//----DELETE MOVIE----//
router.delete("/:id", async (req, res) => {
  let movie = await MovieModel.findByIdAndRemove({ _id: req.params.id });
  if (!movie)
    return res.status(400).send("The movie with the given ID was not found.");
  res.json(movie);
});

//----EDIT MOVIE----//
router.put("/edit/:id", auth, async (req, res) => {
  let validet = validateMovie(req.body);
  if (validet.error) return res.status(400).json(validet.error.details);
  try {
    let data = await MovieModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
