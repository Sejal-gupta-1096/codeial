const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth_controller');

router.get("/" , authController.auth);
router.post("/verify-email" , authController.verifyEmail);
router.get("/reset-password" , authController.resetPassword);
router.post("/reset" , authController.reset);

module.exports = router;