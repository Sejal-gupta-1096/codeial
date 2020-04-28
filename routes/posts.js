const express = require("express");
const router = express.Router();

const postsController = require("../controllers/posts_controller");

router.post("/add-post" , postsController.addPost);

module.exports = router;