require("dotenv").config({ path: "./config/.env" });
require("./config/bd");
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const cookie_parser = require("cookie-parser");
const body_parser = require("body-parser");
const user_route = require("./routes/uts/auth.routes");

const app = express();
const port = process.env.port;
const url = process.env.port;
app.use(cookie_parser());
app.use(helmet());

app.use(cors({ credentials: true, origin: process.env.client_url }));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get(
  ["/", "/register", "/login", "/forget_password", "/reset/:token"],
  function (req, res) {
    res.sendFile(path.join(__dirname, "./frontend/build", "index.html"));
  }
);

app.use("/v1", user_route);
app.listen(port, () => {
  console.log(`Le serveur est démarrer sur le port ${port}`);
});
