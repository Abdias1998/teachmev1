const router = require("express").Router();
const authController = require("../../controler/user/auth/auth");
const user_no_auth = require("../../controler/user/index");
const verifyController = require("../../middleware/user/user");

// Routes for GET requests
router.get(
  "/user_info",
  verifyController.verify_token,
  verifyController.get_user
);

// Routes for POST requests
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.post("/auth/forget", authController.forget_password);
router.post("/auth/logout_session", authController.log_out_session);
router.get("/banner/usersignal", user_no_auth.getUserStats);
router.post("/auth/logout", authController.log_out_session);
router.get("/stats/deviceType", user_no_auth.getUserDeviceTypeStats);

router.get("/users", user_no_auth.get_all_users);

// Route for PUT request
router.put("/auth/reset/:token", authController.reset_password);

// Ajouter une vidéo aux favoris
router.post("/:userId/favorites/:videoId", user_no_auth.addToFavorites);

// Obtenir la liste des vidéos favorites
router.get("/:userId/favorites", user_no_auth.getFavorites);

// Ajouter une vidéo à "Regarder plus tard"
router.post("/:userId/watch-later/:videoId", user_no_auth.addToWatchLater);

// Obtenir la liste des vidéos "Regarder plus tard"
router.get("/:userId/watch-later", user_no_auth.getWatchLater);

// Ajouter une vidéo à la liste des vidéos vues
router.post(
  "/:userId/watched-videos/:videoId",
  user_no_auth.addToWatchedVideos
);

// Obtenir la liste des vidéos vues
// router.get("/:userId/watched-videos", user_no_auth.getWatchedVideos);

router.get("/users/:userId/favorites-videos", user_no_auth.getFavoritesVideos);
router.get(
  "/users/:userId/watched-later-videos",
  user_no_auth.getwatchLaterVideos
);
router.get("/users/:userId/watched-videos", user_no_auth.getWatchedVideos);
module.exports = router;
