const User = require("../../../model/uts/user");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const async_handler = require("express-async-handler");

//Changement du mot de passe
module.exports.reset_password = async_handler(async (req, res) => {
  const { new_pass } = req.body;
  //Vérifier si le champ est saisie et respecte la validation desdonn"es de password
  if (!validator.isLength(password, { min: 4, max: 15 }))
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
});
