const router = require("express").Router();
const rating_controler = require("../../controler/video/rating/ratings");
// Créez une notation pour une vidéo
router.post("/ratings", rating_controler.createRating);
router.get("/ratings/:videoId", rating_controler.getRatings);
router.delete("/ratings", rating_controler.removeRating);
router.get("/all-ratings", rating_controler.getTotalRatingsForAllPreaches);
module.exports = router;
