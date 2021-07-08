const usersRouter = require("./users");
const authRouter = require("./auth");
const movieRouter = require("./movie");

exports.routesInit = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/user", usersRouter);
  app.use("/api/movie", movieRouter);

  app.use((req, res) => {
    res.status(404).json({ msg: "404 url page not found" });
  });
};
