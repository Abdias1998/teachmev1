const Preach = require("../../model/admin/preach/video_preach");
const mongoose = require("mongoose");
const User = require("../../model/user/user"); // Supposons que vous avez un modèle User

// Contrôleur pour la création d'un film
module.exports.createPreach = async (req, res) => {
  try {
    const { title, description, genre, releaseYear, director, cast, duration } =
      req.body;

    const newPreach = new Preach({
      title,
      description,
      genre,
      releaseYear,
      director,
      duration,
      cast: [],
      videoUrl:
        req.file !== null
          ? `${process.env.client_url}/video/${req.file.originalname}`
          : "",
      views: 0,
      coverImage: [],
    });

    const preach = await newPreach.save();

    res.status(201).json({ preach, message: "Vidéo créée avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la création de la vidéo" + error });
  }
};
module.exports.createCoverImage = async (req, res) => {
  const { id } = req.body;
  try {
    const video = await Preach.findById({ _id: id });

    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    await video.updateOne({
      coverImage:
        req.file !== null
          ? `${process.env.client_url}/image/cover_image/${req.file.originalname}`
          : "",
    });

    res
      .status(201)
      .json({ message: "Image de couverture mise à jour avec succès" });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la mise à jour de l'image de couverture" + error,
    });
  }
};

module.exports.readVideo = async (req, res) => {
  Preach.find()
    .sort({ createdAt: -1 }) // Triez les vidéos par ordre décroissant de création (du plus récent au plus ancien)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des vidéos" });
    });
};

module.exports.viewsMiddleware = async (req, res) => {
  const { user } = req.body;
  try {
    const video = Preach.findById({ _id: req.params.id });
    if (!video) return res.status(404).json({ error: "Video not found" });

    if (!video.viewedBy?.includes(user)) {
      video.views++;
      await video.viewedBy.push(user);
      await video.save();
      return res.send("viewvideo");
    } else {
      return res.send("view video by user");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erreur lors d'ajout de vue" + error });
  }
};
