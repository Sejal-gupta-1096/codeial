
const express = require("express");
const router = express.Router();
const passport = require("passport");
const commentsController = require("../controllers/comments_controller");

router.post("/add-comment" , passport.checkAuthentication ,commentsController.addComment);
router.get("/delete-comment/:id" , passport.checkAuthentication ,commentsController.deleteComment);

module.exports = router;