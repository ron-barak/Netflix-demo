const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  video: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  poster_path: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
    default:
      "https://crestedcranesolutions.com/wp-content/uploads/2013/07/facebook-profile-picture-no-pic-avatar.jpg",
  },
  overview: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  release_date: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  vote_average: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  createdAt: { type: Date, default: Date.now },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

exports.MovieModel = mongoose.model("movies", movieSchema);

exports.validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(255).required(),
    video: Joi.string().min(2).max(1024).required(),
    poster_path: Joi.string().min(2).max(1024).required(),
    overview: Joi.string().min(2).max(1024).required(),
    release_date: Joi.string().min(1).max(1024).required(),
    vote_average: Joi.string().min(1).max(1024).required(),
  });

  return schema.validate(movie, { abortEarly: false });
};
