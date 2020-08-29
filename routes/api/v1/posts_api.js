const express = require("express");
const passport = require('passport')
const router = express.Router();
const postsAPIController = require("../../../controllers/api/v1/posts_api_controller");

router.get("/" , postsAPIController.index);
router.delete("/:id" , passport.authenticate('jwt' , {session:false}),postsAPIController.deletePost);

module.exports = router;