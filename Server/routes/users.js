const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { UserModel, validateUser } = require("../models/userModel");
const auth = require("../middleware/auth");
const router = express.Router();

//---USER INFO BY ID---//
router.get("/:id", async (req, res) => {
  const user = await UserModel.findOne({ _id: req.params.id }).select(
    "-password"
  );
  if (!user) return res.status(404).send("The user was not found.");
  res.send(user);
});

//---EDIT USER---//
router.put("/:id", auth, async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await UserModel.findOneAndUpdate({ _id: req.params.id }, req.body);
  if (!user) return res.status(404).send("The user was not found.");

  user = await UserModel.findOne({ _id: req.params.id });

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(user);
  } else {
    res.send(user);
  }
});

//---ADD USER---//
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) {
    const listErrors = {};
    for (const detail of error.details) {
      listErrors[detail.path[0]] = detail.message;
    }
    return res.status(400).send({
      errors: listErrors,
    });
  }

  let user = await UserModel.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send({
      errors: {
        email: "User already registered.",
      },
    });

  user = new UserModel(
    _.pick(req.body, ["name", "email", "password", "image"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
