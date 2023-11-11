require("dotenv").config({ path: "./config/.env" });
require("./config/bd");
const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const cookie_parser = require("cookie-parser");
const body_parser = require("body-parser");
const user_route = require("./routes/user/auth.routes");
const preach_route = require("./routes/video/preach.routes");
const comment_route = require("./routes/video/coment.routes");
const ratings_route = require("./routes/video/ratings.routes");
const admin_auth_route = require("./routes/admin/admin.routes");

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
app.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;
  // Récupérer le chemin complet de l'image
  const imagePath = path.join(__dirname, "./image", filename);
  // Renvoyer l'image au client
  res.sendFile(imagePath);
});

app.get("/video/:filename", (req, res) => {
  const filename = req.params.filename;
  const videopath = path.join(__dirname, "./video", filename);
  res.sendFile(videopath);
});

app.use("/v1", user_route);
app.use("/v1/admin", admin_auth_route);
app.use("/v1/video/preach", preach_route);
app.use("/v1", comment_route);
app.use("/v1", ratings_route);
app.listen(port, () => {
  console.log(`Le serveur est démarrer sur le port ${port}`);
});
