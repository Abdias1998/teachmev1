const Preach = require("../../../model/admin/preach/video_preach");
const mongoose = require("mongoose");
const User = require("../../../model/user/user"); // Supposons que vous avez un modèle User

// Contrôleur pour la création d'un film

module.exports.createRating = async (req, res) => {
  const { videoId, userId, ratingValue } = req.body; // Vous devrez fournir ces données depuis le client

  try {
    // Vérifiez si videoId est un ID Mongoose valide
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "ID de vidéo invalide." });
    }

    const video = await Preach.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "La vidéo n'a pas été trouvée." });
    }

    // Vérifiez si userId est un ID Mongoose valide
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "ID d'utilisateur invalide." });
    }

    // Vérifiez si l'utilisateur existe dans la base de données
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "L'utilisateur n'existe pas." });
    }

    // Vérifiez si l'utilisateur a déjà noté la vidéo
    const existingRating = video.ratings.find(
      (rating) => rating.userId.toString() === userId
    );

    if (existingRating) {
      return res
        .status(400)
        .json({ message: "L'utilisateur a déjà noté cette vidéo." });
    }

    // Créez une nouvelle notation
    video.ratings.push({ userId, rating: ratingValue });
    await video.save();

    return res
      .status(200)
      .json({ message: "La notation a été enregistrée avec succès." });
  } catch (error) {
    console.error("Erreur lors de la création de la notation :", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la création de la notation." });
  }
};

module.exports.removeRating = async (req, res) => {
  const { videoId, userId } = req.body; // Vous devrez fournir ces données depuis le client

  try {
    // Vérifiez si videoId est un ID Mongoose valide
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "ID de vidéo invalide." });
    }

    const video = await Preach.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "La vidéo n'a pas été trouvée." });
    }

    // Vérifiez si userId est un ID Mongoose valide
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "ID d'utilisateur invalide." });
    }

    // Recherchez la notation de l'utilisateur dans les notations de la vidéo
    const ratingIndex = video.ratings.findIndex(
      (rating) => rating.userId.toString() === userId
    );

    if (ratingIndex === -1) {
      return res
        .status(404)
        .json({ message: "L'utilisateur n'a pas noté cette vidéo." });
    }

    // Supprimez la notation de l'utilisateur
    video.ratings.splice(ratingIndex, 1);
    await video.save();

    return res
      .status(200)
      .json({ message: "La notation a été supprimée avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de la notation :", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la notation." });
  }
};

// Méthode pour récupérer les notations d'une vidéo
module.exports.getRatings = async (req, res) => {
  const { videoId } = req.params; // Vous devrez fournir l'ID de la vidéo depuis le client

  try {
    const video = await Preach.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "La vidéo n'a pas été trouvée." });
    }

    return res.status(200).json({ ratings: video.ratings });
  } catch (error) {
    console.error("Erreur lors de la récupération des notations :", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des notations." });
  }
};

// Contrôleur pour obtenir le nombre total de ratings pour toutes les vidéos
exports.getTotalRatingsForAllPreaches = async (req, res) => {
  try {
    const totalRatings = await Preach.aggregate([
      {
        $group: {
          _id: null,
          totalRatings: { $sum: { $size: "$ratings" } },
        },
      },
    ]);

    if (totalRatings.length > 0) {
      res.json({ totalRatings: totalRatings[0].totalRatings });
    } else {
      res.json({ totalRatings: 0 });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du nombre total de ratings :",
      error
    );
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la récupération des ratings." });
  }
};
