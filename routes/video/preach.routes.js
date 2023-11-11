const router = require("express").Router();
const preach_controler = require("../../controler/video/index");
const multer = require("multer");

const storagesVideo = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./video"); // Dossier de destination pour les vidéos
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const storagesImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./image/cover_image"); // Dossier de destination pour les vidéos
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const uploadsVideo = multer({ storage: storagesVideo });
const uploadsImage = multer({ storage: storagesImage });

router.post(
  "/create",
  uploadsVideo.single("videoFile"),
  preach_controler.createPreach
);
router.put(
  "/create/add_image/:id",
  uploadsImage.single("imageFile"),
  preach_controler.createCoverImage
);
router.put("/update/:id", preach_controler.updatePreach);
router.get("/read", preach_controler.readVideo);
router.delete("/delete/:id", preach_controler.deleteVideo);
router.get("/videos/top5", preach_controler.getTop5Videos);

module.exports = router;
// intext:"react" filetype:pdf
