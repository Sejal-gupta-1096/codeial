const express = require("express");
const router = express.Router();
const passport = require("passport");
const likesController = require("../controllers/likes_controller");

router.get("/toggle" , passport.checkAuthentication ,likesController.toggleLike);
module.exports = router;