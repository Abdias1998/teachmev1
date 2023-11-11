const User = require("../../model/user/user");
const jwt = require("jsonwebtoken");
const async_handler = require("express-async-handler");

module.exports.verify_token = async_handler(async (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies?.split("=")[1];
  try {
    if (!token)
      return res.status(404).json({
        message: `Vous n'avez pas un token d'authentification`,
      });
  } catch (error) {
    return res.status(500).json({
      message: `Erreur interne du serveur, veuillez réesayez plus tard`,
    });
  }

  jwt.verify(String(token), process.env.token_secrete, (err, user) => {
    if (!err) {
      req.id = user?.id;
    }
  });
  next();
});

module.exports.get_user = async_handler(async (req, res) => {
  const user_id = req.id;
  let user;
  try {
    user = await User.findById(user_id, "-password");
  } catch (error) {
    return new Error(error);
  }

  try {
    if (user) return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      message: `L'utilisateur n'existe pas`,
    });
  }
});
