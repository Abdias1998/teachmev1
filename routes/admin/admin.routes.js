// authRoutes.js

const router = require("express").Router();

const adminController = require("../../controler/admin/auth/admin_controler"); // Créez ce contrôleur (à définir ci-dessous)
const verifyController = require("../../middleware/admin/admin");
router.get(
  "/user_info_admin",
  verifyController.verify_token_admin,
  verifyController.get_user_admin
);
router.post("/auth/login", adminController.login);
router.get("/all", adminController.get_all_admin);
router.post("/auth/register", adminController.register); // Ajoutez la route d'inscription
router.post("/auth/create_manager/:id", adminController.createManager); // Ajoutez la route d'inscription
router.get("/auth/role", adminController.getCountByRoles); // Ajoutez la route d'inscription

module.exports = router;
