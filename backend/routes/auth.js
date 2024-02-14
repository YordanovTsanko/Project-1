const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  isLoggedIn,
  editUser
} = require("../controllers/authController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/isloggedin").get(isLoggedIn);
router.route("/user/edit/:id").put(editUser);

module.exports = router;
