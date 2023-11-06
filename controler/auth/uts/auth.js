const User = require("../../../model/uts/user");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const async_handler = require("express-async-handler");
const send_email_request = require("../../../utils/send.email");
const send_email = send_email_request.send_email;
const fs = require("fs");
//Inscription
module.exports.register = async_handler(async (req, res) => {
  let user;
  const { pseudo, email, password } = req.body;
  // Vérifier siles données saisir sont valide
  if (!validator.isLength(pseudo, { min: 2, max: 15 }))
    return res.status(401).json({
      message:
        "Le nombre de caractère du pseudo doit être comprise entre 2 et 15",
    });
  if (!validator.isEmail(email))
    return res.status(401).json({ message: "Saisissez un mail Valide" });
  if (!validator.isLength(password, { min: 4, max: 15 }))
    return res.status(401).json({
      message:
        "La longeur de caractère du mot de passe doit être comprise entre 2 et 15",
    });

  // Vérifez si l'user existe déja
  try {
    user = await User.findOne({ $or: [{ email }, { pseudo }] });
  } catch (error) {
    return res.status(500).json({
      message: `Erreur interne du serveur, veuillez réessayez plus tard! ${error}`,
    });
  }

  // Renvoyer une erreur 403 si l'email ou le pseudo est trouver
  if (user)
    return res.status(403).json({
      message: `Lutilisateur avec cet email ou pseudo existe déja, veuillez-vous connectez`,
    });

  // Crypter le mot de passe
  const hashed_password = bcrypt.hashSync(password, 10);

  // Renvoyer les données dans la base
  try {
    const user = await new User({
      pseudo,
      email,
      password: hashed_password,
    });
    user.save();
    return res.status(200).json({ message: "Inscription réussie" });
  } catch (error) {
    return res.status(500).json({
      message: `Erreur interne du serveur, veuillez réessayez plus tard! ${error}`,
    });
  }
});

//Connexion
module.exports.login = async_handler(async (req, res) => {
  const { identifier, password } = req.body;
  // Récuperer le pseudo ou l'email
  let user;
  if (validator.isEmail(identifier)) {
    user = { email: identifier };
  } else if (!validator.isEmail(identifier)) {
    user = { pseudo: identifier };
  } else
    return res.status(401).json({
      message: `Veuillez saisir un pseudo ou un email valide`,
    });

  // Rechercher le pseudo ou le mail
  User.findOne(user)
    .then((existing_user) => {
      if (!existing_user)
        return res.status(401).json({
          message: `Votre pseudo ou mot de passe est incorrect`,
        });

      //   Décrypter le mot de passe dans la bd et le comparer
      const password_hashed = bcrypt.compareSync(
        password,
        existing_user.password
      );
      if (!password_hashed)
        return res.status(401).json({
          message: `Votre mot de passe est incorrect`,
        });

      //   Authentifier l'utilisateur dans le cookie
      const token = jwt.sign(
        { id: existing_user._id },
        process.env.token_secrete,
        {
          expiresIn: "7d",
        }
      );

      // Envoyer la reponse dans le cookie
      res.cookie(String("teachme"), token, {
        path: "/",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 7),
        // httpOnly: false,
        // sameSite: "lax",
        // secure: true,
      });
      return res.status(200).json({
        message: `${existing_user}`,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: `Erreur interne du serveur ${err}`,
      });
    });
});

// Lancement du procéduredu changement du mot de passe
module.exports.forget_password = async_handler(async (req, res) => {
  const { email } = req.body;
  let user;
  //Vérifier si le champ est un email
  if (!validator.isEmail(email) || validator.isEmpty(email))
    return res.status(401).json({
      message: `Saisissez un adress mail valide`,
    });
  //Rechercher l'utilisateur avec son email dans la base de donnée
  try {
    user = await User.findOne({ email: email });
  } catch (error) {
    return res.status(500).json({
      message: `Erreur interne du serveur ${err}`,
    });
  }
  if (!user)
    return res.status(400).json({
      message: `Vous n'aviez pas un compte avec cet email, veuillez vous inscrire d'abord`,
    });
  // Renvoyer un token dans l'url de mesagerie de l'utilisateur
  const reset_token = jwt.sign(
    { _id: user._id },
    process.env.forget_password_token_secret,
    { expiresIn: 3600 * 24 }
  );

  // Ajouter les identifiants en attendant que l'utilisateur clic sur le lien
  await user.updateOne({
    reset_password_token: reset_token,
    reset_password_expires: Date.now() + 3600000 * 24,
  });

  try {
    // L'url a envoyer
    const url = `${process.env.client_url}/reset/${reset_token}`;
    // Lire le template de messagerie de changement du mot de passe
    fs.readFile(
      "./template/reset_password.html",
      "utf-8",
      async (err, data) => {
        if (err)
          return res.status(400).json({
            message: `${err}`,
          });

        const html = data
          .replace(/{pseudo}/g, user.pseudo)
          .replace(/{reset_link}/g, url);

        await send_email(user.email, `Réinitialisation de mot de passe`, html);
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: `L'envoie d'email a echouer, veuillez recommencer l'opération du changement de mot de passe`,
    });
  }
  const three_first_word = user?.email;
  return res.status(200).json({
    message: `Nous venons d'envoyer un lien du changement du mot de passe à ${three_first_word.substr(
      0,
      8
    )}*****@gmail.com. Vérifiez dns vos spams si vous retrouvez par le mail, ce lien expirera dans les 24h`,
  });
});

//Changement du mot de passe
module.exports.reset_password = async_handler(async (req, res) => {
  const { new_pass } = req.body;
  //Vérifier si le champ est saisie et respecte la validation desdonn"es de password
  if (!validator.isLength(new_pass, { min: 4, max: 15 }))
    return res.status(401).json({
      message:
        "La longeur de caractère du mot de passe doit être comprise entre 2 et 15",
    });

  //  Vérifiez le token
  const decoded = jwt.verify(
    req.params.token,
    process.env.forget_password_token_secret
  );

  const user = await User.findById(decoded._id);
  if (!user)
    return res.status(403).json({
      message: `Authentification échoué, veuillez récommencer l'opération du changement du mot de passe`,
    });

  if (user.reset_password_expires < Date.now()) {
    return res.status(403).json({
      message: `Le lien du réinitialisation de mot de passe a expiré ou a déjà été cliquer`,
    });
  }

  // Crypter le nouveau mot de passe
  const hashed_new_pass = bcrypt.hashSync(new_pass, 10);

  await user.updateOne({
    reset_password_token: "",
    reset_password_expires: "",
    password: hashed_new_pass,
  });

  return res.status(200).json({
    message: `votre mot de passe à été changé avec succès. Veuillez-vous connectez à présent avec le nouveau mot de passe`,
  });
});

// Déconnexion partielle
module.exports.log_out_session = async_handler(async (req, res) => {
  const cookies = req.headers.cookie;
  const prevent_token = cookies?.split("=")[1];
  if (!prevent_token) {
    return res.status(400).json({
      message: `Déconnexion échoué, veuillez réessayez plus tard`,
    });
  }

  // Vérifez si son coookie existe toujours
  jwt.verify(String(prevent_token), process.env.token_secrete, (err) => {
    if (err)
      return res.status(404).json({
        message: `Authentification échoué ${err}`,
      });

    return res.status(200).json({ message: "Déconnexion" });
  });
});

// Déconnexion
module.exports.log_out = async_handler(async (req, res) => {
  const cookies = req.headers.cookie;
  const prevent_token = cookies?.split("=")[1];
  if (!prevent_token) {
    return res.status(400).json({
      message: `Déconnexion échoué, veuillez réessayez plus tard`,
    });
  }
  // Vérifez si son coookie existe toujours
  jwt.verify(String(prevent_token), process.env.token_secrete, (err) => {
    if (err)
      return res.status(404).json({
        message: `Authentification échoué ${err}`,
      });
    res.clearCookie("teachme");
    req.cookies = req.cookies || {};
    req.cookies["teachme"] = "";
    return res.status(200).json({ message: "Déconnexion" });
  });
});
