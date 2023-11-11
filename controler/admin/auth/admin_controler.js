// authController.js
const jwt = require("jsonwebtoken");
const async_handler = require("express-async-handler");
const Admin = require("../../../model/admin/admin"); // Assurez-vous d'ajuster le chemin en fonction de votre structure de projet
module.exports.register = async (req, res) => {
  const { identifier, password } = req.body;
  if (identifier != process.env.admin_user)
    return res.status(400).json({ message: "Non authorisé" });
  if (password != process.env.admin_password)
    return res.status(400).json({ message: "Non authorisé" });
  function isAdmin() {
    if (identifier === process.env.admin_user) return true;
  }

  function nameAdmin() {
    if (identifier === process.env.admin_user) return "AdminPrincipal";
  }
  try {
    // Vérifiez si un administrateur avec le même nom d'utilisateur existe déjà
    const existingAdmin = await Admin.findOne({ identifier });

    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Cet administrateur existe déjà" });
    }

    // Créez un nouvel administrateur
    const admin = new Admin({
      identifier,
      password,
      isAdminPrincipal: isAdmin(),
      pseudo: nameAdmin(),
      isManager: isAdmin(),
    });
    await admin.save();

    // Vous pouvez également générer un token JWT et le renvoyer ici si vous le souhaitez.

    res.status(201).json({ message: admin });
  } catch (error) {
    res.status(500).json({ message: "Erreur de serveur" + error });
  }
};
module.exports.login = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const admin = await Admin.findOne({ identifier });

    if (!admin) {
      return res.status(401).json({ message: "Identifiant incorrect" });
    }

    const passwordMatch = await admin.comparePassword(password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // const token = jwt.sign({ adminId: admin._id }, "votre_secret_jwt"); // Remplacez 'votre_secret_jwt' par une clé secrète réelle
    // res.json({ token });
    //   Authentifier l'utilisateur dans le cookie
    const token = jwt.sign({ id: admin._id }, process.env.token_secrete_admin, {
      expiresIn: "1d",
    });

    // Envoyer la reponse dans le cookie
    res.cookie(String("admin"), token, {
      path: "/",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      // httpOnly: false,
      // sameSite: "lax",
      // secure: true,
    });
    return res.status(200).json({
      message: `${admin}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur de serveur" + error });
  }
};
module.exports.get_all_admin = async_handler(async (req, res) => {
  Admin.find().then((data) => {
    res.send(data);
  });
});
module.exports.createManager = async (req, res) => {
  const { role, password, identifier } = req.body;
  let user;
  const maDate = new Date();

  try {
    user = await Admin.findById(req.params.id);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur interne du serveur" + error });
  }
  if (!user) return res.status(400).json({ message: "No authaurization" });
  try {
    if (user.isAdminPrincipal) {
      // Créez un nouvel administrateur
      const admin = new Admin({
        password,
        isAdminPrincipal: false,
        pseudo: `manager_${identifier.slice(0, 5)}`,
        isManager: true,
        role,
        identifier,
      });
      await admin.save();
      res.status(201).json({ message: admin });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur de serveur" + error });
  }
};

// Contrôleur pour obtenir le nombre d'admins avec isManager et isAdminPrincipal
module.exports.getCountByRoles = async (req, res) => {
  try {
    const countIsManager = await Admin.countDocuments({ isManager: true });
    const countIsAdminPrincipal = await Admin.countDocuments({
      isAdminPrincipal: true,
    });

    res.json({ countIsManager, countIsAdminPrincipal });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du nombre d'admins par rôle :",
      error
    );
    res.status(500).json({
      error:
        "Erreur serveur lors de la récupération du nombre d'admins par rôle.",
    });
  }
};
