const Preach = require("../../model/admin/preach/video_preach");
const mongoose = require("mongoose");
const User = require("../../model/user/user"); // Supposons que vous avez un modèle User
const ObjectId = mongoose.Types.ObjectId;
const fs = require("fs");
const path = require("path");

// ...

// module.exports.createPreach = async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       genre,
//       releaseYear,
//       director,
//       cast,
//       duration,
//       keywords,
//     } = req.body;
//     function backdrop_path() {
//       return `${process.env.port}/image/backdrop_path/${director}`;
//     }

//     // Utilise la date actuelle pour générer un nom de fichier unique
//     const currentDate = new Date();
//     const timestamp = currentDate.getTime();
//     const fileName = `video_${timestamp}.mp4`; // Tu peux ajuster l'extension du fichier si nécessaire

//     const newPreach = new Preach({
//       title,
//       description,
//       keywords,
//       genre,
//       releaseYear,
//       director,
//       backdrop_path: backdrop_path(),
//       duration,
//       cast: [],
//       videoUrl:
//         req.file !== null
//           ? `${process.env.port}/video/${req.file.originalname}`
//           : "",
//       views: 0,
//       coverImage: [],
//     });

//     const preach = await newPreach.save();

//     // // Renomme le fichier avec le nom généré
//     // if (req.file !== null) {
//     //   const filePath = path.join(
//     //     __dirname,
//     //     `../video/${req.file.originalname}`
//     //   );
//     //   const newFilePath = path.join(__dirname, `../video//${fileName}`);
//     //   fs.renameSync(filePath, newFilePath);
//     // }

//     res.status(201).json({ preach, message: "Vidéo créée avec succès" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "Erreur lors de la création de la vidéo" + error });
//   }
// };

// Contrôleur pour la création d'un film
module.exports.createPreach = async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      releaseYear,
      director,
      cast,
      duration,
      keywords,
      subtitle,
    } = req.body;
    function backdrop_path() {
      return `${process.env.port}/image/backdrop_path/${director}`;
    }

    const newPreach = new Preach({
      title,
      description,
      keywords,
      genre,
      releaseYear,
      director,
      backdrop_path: backdrop_path(),
      duration,
      cast: [],
      videoUrl:
        req.file !== null
          ? `${process.env.port}/video/${req.file.originalname}`
          : "",
      views: 0,
      coverImage: [],
      subtitle,
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
          ? `${process.env.port}/image/cover_image/${req.file.originalname}`
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

// Contrôleur pour récupérer les prédications non présentes dans les listes de l'utilisateur
module.exports.getUnwatchedPreaches = async (req, res) => {
  const { userId } = req.params;

  try {
    // Récupérer l'utilisateur
    const user = await User.findById({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Fonction pour récupérer les réalisateurs les plus fréquents
    const getTopDirectors = async (videoIds) => {
      const directorCount = {};

      for (const videoIdArray of [
        user.favorites,
        user.watchLater,
        user.watchedVideos,
      ]) {
        const videos = await Preach.find({ _id: { $in: videoIdArray } });

        videos.forEach((video) => {
          const director = video.director;
          // Vérifier si la propriété director existe et est une chaîne de caractères
          if (director && typeof director === "string") {
            directorCount[director] = (directorCount[director] || 0) + 1;
          }
        });
      }

      const sortedDirectors = Object.keys(directorCount).sort(
        (a, b) => directorCount[b] - directorCount[a]
      );

      return sortedDirectors;
    };

    // Récupérer les réalisateurs les plus fréquents
    const topDirectors = await getTopDirectors([
      ...user.favorites,
      ...user.watchLater,
      ...user.watchedVideos,
    ]);

    // Récupérer les prédications dont les réalisateurs dominent dans les listes de l'utilisateur
    const unwatchedPreaches = await Preach.find({
      director: { $in: topDirectors },
      _id: {
        $nin: [...user.watchedVideos, ...user.watchLater, ...user.favorites],
      },
    })
      .sort({ views: -1 }) // Triez par le nombre de vues décroissant
      .limit(Math.ceil(0.5 * topDirectors.length)); // Limitez le nombre de résultats à 50% des réalisateurs les plus fréquents

    res.status(200).json({ unwatchedPreaches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
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
module.exports.updatePreach = async (req, res) => {
  try {
    const { id } = req.params; // Identifiant de la vidéo à mettre à jour
    const {
      title,
      description,
      genre,
      releaseYear,
      director,
      cast,
      duration,
      keywords,
      subtitles,
    } = req.body;

    // Recherchez la vidéo par son identifiant
    const preach = await Preach.findById(id);

    if (!preach) {
      return res.status(404).json({ error: "Vidéo non trouvée" });
    }

    // Mettez à jour les propriétés de la vidéo
    preach.title = title;
    preach.description = description;
    preach.genre = genre;
    preach.releaseYear = releaseYear;
    preach.director = director;
    preach.duration = duration;
    preach.keywords = keywords;
    preach.subtitles = subtitles;

    // Enregistrez les modifications
    const updatedPreach = await preach.save();

    res.status(200).json({
      preach: updatedPreach,
      message: "Vidéo mise à jour avec succès",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de la vidéo " + error });
  }
};
module.exports.deleteVideo = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Id Inconnue" + req.params.id);
  }

  Preach.findByIdAndRemove(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      return res.status(500).json({
        message:
          "Vous pouvez pas supprimez cette vidéo, veuilez réessayez plus tard" +
          err,
      });
    });
};

module.exports.getTop55Videos = async (req, res) => {
  try {
    const top55MostViewedVideos = await Preach.find({})
      .sort({ views: -1 })
      .limit(55);

    const top55MostCommentedVideos = await Preach.find({})
      .sort({ "comments.length": -1 })
      .limit(55);

    res.status(200).json({
      mostViewed: top55MostViewedVideos,
      mostCommented: top55MostCommentedVideos,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des vidéos " + error });
  }
};
module.exports.getVideoSubtitle = async (req, res) => {
  try {
    const videos = await Preach.find({ subtitle: "true" });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
