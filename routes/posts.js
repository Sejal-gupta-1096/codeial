const express = require("express");
const router = express.Router();
const passport = require("passport")
const postsController = require("../controllers/posts_controller");

router.post("/add-post" , passport.checkAuthentication ,postsController.addPost);
router.get("/delete-post/:id" , passport.checkAuthentication ,postsController.deletePost);

module.exports = router;