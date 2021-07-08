const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { jwtKey } = require("../config/default.json");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 1024,
  },
  image: {
    type: String,
    minlength: 11,
    maxlength: 1024,
    default:
      "https://ih0.redbubble.net/image.618363037.0853/flat,1000x1000,075,f.u2.jpg",
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, jwtKey);
  return token;
};

exports.UserModel = mongoose.model("users", userSchema);

exports.validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024),
    image: Joi.string().min(11).max(1024),
  });

  return schema.validate(user, { abortEarly: false });
};
