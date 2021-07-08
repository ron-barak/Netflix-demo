const express = require("express");
const app = express();
const http = require("http").createServer(app);
const mongoDb = require("./db/mongoConnect");
const cors = require("cors");
const { routesInit } = require("./routes/app_routes");

app.use(cors());
app.use(express.json());
routesInit(app);

const port = process.env.PORT || 3900;
http.listen(port, () => console.log(`Listening on port ${port}...`));
