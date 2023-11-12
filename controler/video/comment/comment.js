const mongoose = require("mongoose");
const Preach = require("../../../model/admin/preach/video_preach");

// Contrôleur pour créer un commentaire
exports.createComment = async (req, res) => {
  const { videoId, userId, text } = req.body; // Vous devrez fournir ces données depuis le client

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

    // Créez un nouveau commentaire
    const comment = {
      userId,
      text,
    };

    video.comments.push(comment);
    await video.save();

    return res
      .status(201)
      .json({ message: "Le commentaire a été créé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la création du commentaire :", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la création du commentaire." });
  }
};

// Contrôleur pour lire les commentaires d'une vidéo
exports.getComments = async (req, res) => {
  const { videoId } = req.params; // Vous devrez fournir l'ID de la vidéo depuis le client

  try {
    // Vérifiez si videoId est un ID Mongoose valide
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "ID de vidéo invalide." });
    }

    const video = await Preach.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "La vidéo n'a pas été trouvée." });
    }

    return res.status(200).json({ comments: video.comments });
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires :", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des commentaires." });
  }
};

// Contrôleur pour mettre à jour un commentaire
exports.updateComment = async (req, res) => {
  const { videoId, commentId, userId, newText } = req.body; // Vous devrez fournir ces données depuis le client

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

    // Recherchez le commentaire dans les commentaires de la vidéo
    const comment = video.comments.id(commentId);

    if (!comment) {
      return res
        .status(404)
        .json({ message: "Le commentaire n'a pas été trouvé." });
    }

    // Vérifiez si l'utilisateur est l'auteur du commentaire
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({
        message: "Vous n'êtes pas autorisé à modifier ce commentaire.",
      });
    }

    // Mettez à jour le texte du commentaire
    comment.text = newText;
    await video.save();

    return res
      .status(200)
      .json({ message: "Le commentaire a été mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du commentaire :", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du commentaire." });
  }
};

// Contrôleur pour supprimer un commentaire
exports.deleteComment = async (req, res) => {
  const { videoId, commentId, userId } = req.body; // Vous devrez fournir ces données depuis le client

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

    // Recherchez le commentaire dans les commentaires de la vidéo
    const comment = video.comments.id(commentId);

    if (!comment) {
      return res
        .status(404)
        .json({ message: "Le commentaire n'a pas été trouvé." });
    }

    // Vérifiez si l'utilisateur est l'auteur du commentaire
    if (comment.userId.toString() !== userId) {
      return res.status(403).json({
        message: "Vous n'êtes pas autorisé à supprimer ce commentaire.",
      });
    }

    // Supprimez le commentaire
    comment.remove();
    await video.save();

    return res
      .status(200)
      .json({ message: "Le commentaire a été supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du commentaire :", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la suppression du commentaire." });
  }
};

// Contrôleur pour obtenir le nombre total de commentaires pour toutes les vidéos
module.exports.getTotalCommentsForAllPreaches = async (req, res) => {
  try {
    const totalComments = await Preach.aggregate([
      {
        $group: {
          _id: null,
          totalComments: { $sum: { $size: "$comments" } },
        },
      },
    ]);

    if (totalComments.length > 0) {
      res.json({ totalComments: totalComments[0].totalComments });
    } else {
      res.json({ totalComments: 0 });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du nombre total de commentaires :",
      error
    );
    res.status(500).json({
      error: "Erreur serveur lors de la récupération des commentaires.",
    });
  }
};
