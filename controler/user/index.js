const User = require("../../model/user/user");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const async_handler = require("express-async-handler");

const fs = require("fs");

module.exports.get_all_users = async_handler(async (req, res) => {
  User.find().then((data) => {
    res.send(data);
  });
});
module.exports.update_profil = async_handler(async (req, res) => {
  const { pseudo, email } = req.body;
  /**La méthode ObjectId de mongoose pour vérifer si le nombre de caractère est exacte à celle de mongoose */
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).send({ messsage: `Utulisateur inconnu` });
  /*2 - Vérifiez maintenant si les données saisir respecte notre schéma de validation */
  /**Mettre à jour 4 champs(nom,prénom,tel et email) */
  if (validator.isEmpty(pseudo) || validator.isEmpty(email))
    return res.status(401).json({
      message: `Veuillez remplir touts les champs`,
    });
  if (!validator.isLength(pseudo, { min: 2, max: 15 }))
    return res.status(401).json({
      message: `Le pseudo est trop pétit ou trop long`,
    });
  if (!validator.isEmail(email))
    return res
      .status(401)
      .json({ message: `Votre nouvelle adress email est invalid` });

  let user;
  user = await User.findById({ _id: req.params.id });
  if (!user)
    return res.status(403).json({ messsage: `L'identifiant n'existe pas` });

  /**Metrre à jour les informatio dans la base de donnéé */

  /**Si l'email est trouver, lui renvoyé une réponse 403 qu'il est déja pris */

  let existingUser;
  existingUser = await User.findOne({ email: email });
  if (existingUser && existingUser._id.toString() !== req.params.id)
    return res
      .status(401)
      .json({ message: `Cet émail est déjà utilisé par un utilisateur` });
  else
    try {
      User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            pseudo: pseudo,

            email: email,
          },
        },
        {
          new: true,
        },
        (err, docs) => {
          /**Réponse finale */
          if (!err)
            return res.status(200).json({
              message: "Vos informations sont mises à jours",
              docs /**Renvoyer l'user sans son mot de passe */,
            });
          else
            return res.status(401).json({
              message: `L'utilisateur avec cet email existe déja, veuillez choisir un autre`,
            });
        }
      ).select(`-password`);
    } catch (error) {
      return res.status(500).json({
        message: `Erreur interne du serveur, veuillez réessayer plus tard !' ${error}`,
      });
    }
});

/*6...Changer le profil par défaut */
module.exports.upload_profil = async_handler(async (req, res) => {
  /**Vérifier si c'est un format jpg , jpeg ou png */
  if (
    req.file?.mimetype != `image/jpeg` &&
    req.file?.mimetype != `image/jpg` &&
    req.file?.mimetype != `image/png`
  )
    return res.status(404).json({
      message: `Veuillez choisir un format de fichier(.jpg, .jpeg, .png)`,
    });
  let user;
  /**Passer l'id de l'utilisateur pour la mise à jours */
  if (!ObjectId.isValid(req.body.userId))
    return res.status(404).json({ messsage: `L'identifiant n'existe pas` });

  user = await User.findById({ _id: req.body.userId });
  if (!user)
    return res.status(403).json({ messsage: `L'identifiant n'existe pas` });

  try {
    await User.findByIdAndUpdate(
      req.body.userId,
      {
        $set: {
          // picture: `../image/user/${req.body.userId}.jpg`,

          picture: `${process.env.URL}/image/picture/${req.body.userId}.jpg`,
        } /**sauvegader l'image avec son id pour qu'il soit unique même s'il change ses information après */,
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );
    return res
      .status(200)
      .json({ message: "Profil mise à jour, veuillez raffraîchir la page !" });
  } catch (error) {
    return res.status(500).json({
      message: `Erreur interne du serveur, veuillez réessayez plus tard ${error} !`,
    });
  }
});

module.exports.getUserStats = async (req, res) => {
  try {
    const bannedUserCount = await User.countDocuments({ user_banned: true });

    const usersWithReporting = await User.aggregate([
      {
        $match: {
          reporting: { $exists: true },
        },
      },
      {
        $project: {
          reportingCount: { $size: "$reporting" },
        },
      },
      {
        $match: {
          reportingCount: { $gt: 5 },
        },
      },
    ]);

    res.json({
      bannedUserCount,
      usersWithReportingCount: usersWithReporting.length,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des statistiques" });
  }
};

// Contrôleur pour obtenir les statistiques du nombre d'utilisateurs par type d'appareil
exports.getUserDeviceTypeStats = async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: "$deviceType",
          count: { $sum: 1 },
        },
      },
    ]);

    const deviceTypeStats = {};
    stats.forEach((stat) => {
      deviceTypeStats[stat._id] = stat.count;
    });

    res.json(deviceTypeStats);
  } catch (error) {
    res.status(500).json({ error: "Une erreur s'est produite" });
  }
};
