const router = require("express").Router();
const authController = require("../../controler/auth/uts/auth");
const verifyController = require("../../middleware/user");

// Routes for GET requests
router.get(
  "/user_info",
  verifyController.verify_token,
  verifyController.get_user
);

// Routes for POST requests
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.post("/auth/forget", authController.forget_password);
router.post("/auth/logout_session", authController.log_out_session);
router.post("/auth/logout", authController.log_out_session);

// Route for PUT request
router.put("/auth/reset/:token", authController.reset_password);

module.exports = router;
