const router = require("express").Router();
const comment_controler = require("../../controler/video/comment/comment");

router.post("/comments", comment_controler.createComment);
router.get("/comments/:videoId", comment_controler.getComments);
router.put("/comments", comment_controler.updateComment);
router.delete("/comments", comment_controler.deleteComment);
router.get("/all-comments", comment_controler.getTotalCommentsForAllPreaches);

module.exports = router;
