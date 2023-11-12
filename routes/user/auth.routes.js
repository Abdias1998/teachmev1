const router = require("express").Router();
const authController = require("../../controler/user/auth/auth");
const user_no_auth = require("../../controler/user/index");
const verifyController = require("../../middleware/user/user");

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
router.get("/banner/usersignal", user_no_auth.getUserStats);
router.post("/auth/logout", authController.log_out_session);
router.get("/stats/deviceType", user_no_auth.getUserDeviceTypeStats);

router.get("/users", user_no_auth.get_all_users);

// Route for PUT request
router.put("/auth/reset/:token", authController.reset_password);

module.exports = router;
