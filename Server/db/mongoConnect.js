const mongoose = require("mongoose");
const { mongoDbPass, mongodbName } = require("../config/default.json");

mongoose.connect(
  `mongodb+srv://${mongodbName}:${mongoDbPass}@cluster0.s6j40.mongodb.net/tests`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB...");
});
